import _ from 'mudash'
import invariant from 'invariant'
import stutter from 'stutter'
import { createStore, updateStore } from 'duxtape'
import { eachModules, reduceModules } from '../util'

export default function createEngine() {

  let Factories         = {}
  let ModuleRegistry    = null

  let booted            = false
  let engine            = null
  let initialized       = false

  const injection = {
    injectFactory(type, InjectedFactory) {
      invariant(
        !Factories[type],
        `Factory(${type}): Cannot inject ${type} Factory more than once.
        You are likely trying to load more than one copy of Moltres.`
      )
      Factories = _.assoc(Factories, type, InjectedFactory)
    },
    injectModuleRegistry(InjectedRegistry) {
      invariant(
        !ModuleRegistry,
        `ModuleRegistry: Cannot inject ModuleRegistry more than once.
        You are likely trying to load more than one copy of Moltres.`
      )
      ModuleRegistry = InjectedRegistry
    }
  }

  function getModule(type, name, namespace = 'moltres') {
    return ModuleRegistry.get(namespace, type, name)
  }

  function getModules(type, namespace = 'motlres') {
    return ModuleRegistry.get(namespace, type)
  }

  function getModuleMap() {
    return ModuleRegistry.getMap()
  }

  function getModulesInDependencyOrder(types, namespace = 'moltres') {
    return ModuleRegistry.getInDependencyOrder(namespace, types)
  }

  function validateModule(module, name, type, namespace) {
    const info = _.get(module, 'info')
    invariant(
      !!info,
      `Module(${info.namespace}:${info.type}:${info.name}): Could not find info for module`
    )
    invariant(
      info.namespace === namespace,
      `Module(${info.namespace}:${info.type}:${info.name}): Module namespace does not match mapping`
    )
    invariant(
      info.type === type,
      `Module(${info.namespace}:${info.type}:${info.name}): Module type does not match mapping`
    )
    invariant(
      info.name === name,
      `Module(${info.namespace}:${info.type}:${info.name}): Module name does not match mapping`
    )
  }

  function registerModules(modules = _.im({})) {
    let changedModules = []
    eachModules(modules, (module, name, type, namespace) => {
      validateModule(module, name, type, namespace)
      if (!ModuleRegistry.hasExact(module)) {
        ModuleRegistry.register(module)
        changedModules = _.push(changedModules, module)
      }
    })
    if (booted) {
      update(changedModules)
    }
  }

  function boot() {
    invariant(
      !booted,
      'Engine: Already booted, call update if trying to boot new modules'
    )
    booted = true
    bootModules()
  }

  function init() {
    invariant(
      !initialized,
      'App: Already initialized, call update if trying to init new modules'
    )
    generateStore(_.im({}))
    trySubscribe()
    updateState()
    initDrivers()
  }

  function initDrivers() {
    const drivers = getModulesInDependencyOrder(['driver', 'plugin'])
    _.each(drivers, (driver) => {
      if (!driver.initialized) {
        driver.initialized = true
        if (_.isFunction(_.get(driver, 'init'))) {
          driver.init()
        }
      }
    })
  }


  function generateStore(state) {
    const modules = engine.getModulesInDependencyOrder()
    if (!store) {
      store = createStore(modules, state)
    } else {
      store = updateStore(store, modules, state)
    }
    return store
  }

  function bootModules() {
    const modules = getModulesInDependencyOrder()
    _.each(modules, (module) => {
      if (_.isFunction(_.get(module, 'boot'))) {
        module.boot({
          engine,
          info: module.info,
          module
        })
      }
    })
  }

  function factory(module, properties) {
    const { info } = module
    const Factory = Factories[info.type]
    let instance = module
    if (Factory) {
      instance = Factory.factory({ engine, info, module, properties })
    }
    return instance
  }

  function getLang() {
    const moduleMap = getModuleMap()
    reduceModules(moduleMap, (reduction, module, name, type, namespace) => {
      if (_.has(module, 'lang')) {
        return _.set(reduction, `${namespace}.${type}.${name}`, module.lang)
      }
      return reduction
    }, {})
  }

  async function run(blueprint, options = {}) {
    const lang = getLang()
    return await stutter.run(blueprint, {
      ...options,
      lang
    })
  }

  engine = {
    boot,
    getModule,
    getModulesInDependencyOrder,
    injection,
    registerModules,
    run
  }

  return engine
}
