import _ from 'mudash'
import invariant from 'invariant'
import { createStore } from 'redux'


const PASS = arg => arg

export default function createEngine() {

  let Factories         = {}
  let Registry          = null
  let SchemaCache       = null

  let store             = null
  let storeState        = null
  let engine            = null

  const injection = {
    injectFactory(type, InjectedFactory) {
      invariant(
        !Factories[type],
        `Factory(${type}): Cannot inject ${type} Factory more than once.
        You are likely trying to load more than one copy of Moltres.`
      )
      Factories = _.assoc(Factories, type, InjectedFactory)
    },
    injectRegistry(InjectedRegistry) {
      invariant(
        !Registry,
        `Registry: Cannot inject Registry more than once.
        You are likely trying to load more than one copy of Moltres.`
      )
      Registry = InjectedRegistry
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

  function getDriversInDependencyOrder() {
    return Registry.getInDependencyOrder(['drivers', 'plugins'])
  }

  function getModule(type, name) {
    return Registry.get(type, name)
  }

  function getModulesInDependencyOrder(types) {
    return Registry.getInDependencyOrder(types)
  }


  function getStore() {
    if (!store) {
      generateStore()
    }
    return store
  }

  function dispatch(action) {
    getStore().dispatch(action)
  }

  function validateSchema(schema, type, name) {
    invariant(
      _.has(schema, 'info'),
      `Schema(${type}:${name}): Could not find info for module schema`
    )
  }

  function updateBlueprint(blueprint = _.im({})) {
    _.each(blueprint, (modules, type) => {
      _.each(modules, (schema, name) => {
        validateSchema(schema, type, name)
        if (!SchemaCache.has(type, schema)) {
          SchemaCache.set(type, schema)
          const Factory = Factories[type]
          let module = schema
          if (Factory) {
            module = Factory.factory(schema, engine)
          }
          Registry.register(type, module)
        }
      })
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
    dispatch,
    getModule,
    getModulesInDependencyOrder,
    getStore,
    injection,
    tryUnsubscribe,
    updateBlueprint
  }

  return engine
}
