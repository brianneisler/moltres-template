import _ from 'mudash'
import invariant from 'invariant'
import { createStore } from 'redux'


const PASS = arg => arg

export default function createEngine() {

  let DriverFactory     = null
  let DriverRegistry    = null
  let SchemaCache       = null

  let store             = null
  let storeState        = null
  let engine            = null

  const injection = {
    injectDriverFactory(InjectedDriverFactory) {
      invariant(
        !DriverFactory,
        `DriverFactory: Cannot inject driver factory more than once.
        You are likely trying to load more than one copy of Moltres.`
      )
      DriverFactory = InjectedDriverFactory
    },
    injectDriverRegistry(InjectedDriverRegistry) {
      invariant(
        !DriverRegistry,
        `DriverRegistry: Cannot inject driver registry more than once.
        You are likely trying to load more than one copy of Moltres.`
      )
      DriverRegistry = InjectedDriverRegistry
    },
    injectSchemaCache(InjectedSchemaCache) {
      invariant(
        !SchemaCache,
        `SchemaCache: Cannot inject schema cache more than once.
        You are likely trying to load more than one copy of Moltres.`
      )
      SchemaCache = InjectedSchemaCache
    }
  }

  function dispatch(action) {
    getStore().dispatch(action)
  }

  function getDriver(name) {
    return DriverRegistry.getDriver(name)
  }

  function getDriversInDependencyOrder() {
    return DriverRegistry.getDriversInDependencyOrder()
  }

  function getStore() {
    if (!store) {
      generateStore()
    }
    return store
  }

  function updateBlueprint(blueprint = _.im({})) {
    const { drivers } = blueprint
    _.each(drivers, (schema) => {
      if (!SchemaCache.has(schema)) {
        SchemaCache.set(schema)
        const driver = DriverFactory.factoryDriver(schema, engine)
        DriverRegistry.registerDriver(driver)
      }
    })
    generateStore(_.assoc(_.im({}), { blueprint }))
    trySubscribe()
    updateState()
    initDrivers()
  }

  function generateStore(state) {
    const drivers = getDriversInDependencyOrder()
    if (!store) {
      store = createEngineStore(state, drivers)
    } else {
      store = updateStore(state, drivers)
    }
    return store
  }

  function createEngineStore(state, drivers) {
    state = createState(state, drivers)
    return createStore(
      composeReducer(state, drivers),
      state,
      composeEnhancer(state, drivers)
    )
  }

  function createState(state, drivers) {
    return _.reduce(_.reverse(drivers), (reduction, driver) => {
      if (_.isFunction(_.get(driver, 'createState'))) {
        return driver.createState(reduction, drivers)
      }
      return reduction
    }, state)
  }

  function composeReducer(state, drivers) {
    return _.reduce(drivers, (reducer, driver) => {
      if (_.isFunction(_.get(driver, 'composeReducer'))) {
        return driver.composeReducer(reducer, state, drivers)
      }
      return reducer
    }, PASS)
  }

  function composeEnhancer(state, drivers) {
    return _.reduce(drivers, (enhancer, driver) => {
      if (_.isFunction(_.get(driver, 'composeEnhancer'))) {
        return driver.composeEnhancer(enhancer, state, drivers)
      }
      return enhancer
    }, PASS)
  }

  function initDrivers() {
    const drivers = getDriversInDependencyOrder()
    _.each(drivers, (driver) => {
      if (!driver.initialized) {
        driver.initialized = true
        if (_.isFunction(driver.initDriver)) {
          driver.initDriver()
        }
      }
    })
  }

  function updateState() {
    const state = store.getState()
    const drivers = getDriversInDependencyOrder()
    _.each(drivers, (driver) => {
      driver.updateState(state, dispatch)
    })
  }

  function updateStore(state, drivers) {
    // const state       = store.getState() TODO BRN: Deal with existing state
    return store.replaceReducer(composeReducer(state, drivers))
  }

  let unsubscribe

  function isSubscribed() {
    return typeof unsubscribe === 'function'
  }

  function trySubscribe() {
    if (!isSubscribed()) {
      unsubscribe = store.subscribe(handleChange)
    }
  }

  function tryUnsubscribe() {
    if (isSubscribed()) {
      unsubscribe()
      unsubscribe = null
    }
  }

  function handleChange() {
    if (!isSubscribed()) {
      return
    }

    const currentStoreState = store.getState()
    const prevStoreState = storeState
    if (prevStoreState === currentStoreState) {
      return
    }

    storeState = currentStoreState
    updateState()
  }

  engine = {
    getDriver,
    getDriversInDependencyOrder,
    getStore,
    injection,
    tryUnsubscribe,
    updateBlueprint
  }

  return engine
}
