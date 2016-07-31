import _ from 'mudash';
import invariant from 'invariant';
import { createStore } from 'redux';
import * as internalDrivers from './drivers';

const PASS = arg => arg;

export default class Engine {

  static DriverFactory    = null;
  static DriverRegistry   = null;
  static SchemaCache      = null;

  static store            = null;

  static injection = {
    injectDriverFactory(InjectedDriverFactory) {
      invariant(
        !Engine.DriverFactory,
        `DriverFactory: Cannot inject driver factory more than once.
        You are likely trying to load more than one copy of Moltres.`
      );
      Engine.DriverFactory = InjectedDriverFactory;
    },
    injectDriverRegistry(InjectedDriverRegistry) {
      invariant(
        !Engine.DriverRegistry,
        `DriverRegistry: Cannot inject driver registry more than once.
        You are likely trying to load more than one copy of Moltres.`
      );
      Engine.DriverRegistry = InjectedDriverRegistry;
    },
    injectSchemaCache(InjectedSchemaCache) {
      invariant(
        !Engine.SchemaCache,
        `SchemaCache: Cannot inject schema cache more than once.
        You are likely trying to load more than one copy of Moltres.`
      );
      Engine.SchemaCache = InjectedSchemaCache;
    }
  };

  static getDriver(name) {
    return Engine.DriverRegistry.getDriver(name);
  }

  static getDriversInDependencyOrder() {
    return Engine.DriverRegistry.getDriversInDependencyOrder();
  }

  static getStore() {
    if (!Engine.store) {
      Engine.generateStore({});
    }
    return Engine.store;
  }

  static updateBlueprint(blueprint) {
    const { DriverFactory, DriverRegistry, SchemaCache } = Engine;
    let { drivers } = blueprint;
    drivers = _.assign({}, internalDrivers, drivers);
    _.each(drivers, (schema) => {
      if (!SchemaCache.has(schema)) {
        SchemaCache.set(schema);
        const driver = DriverFactory.factoryDriver(schema);
        DriverRegistry.registerDriver(driver);
      }
    });
    Engine.generateStore({blueprint});
  }

  static generateStore(state) {
    const drivers = Engine.getDriversInDependencyOrder();
    if (!Engine.store) {
      Engine.store = Engine.createStore(state, drivers);
    } else {
      Engine.store = Engine.updateStore(state, Engine.store.getState());
    }
    return Engine.store;
  }

  static createStore(state, drivers) {
    state = Engine.createState(state, drivers);
    return createStore(
      Engine.composeReducer(state, drivers),
      state,
      Engine.composeEnhancer(state, drivers)
    );
  }

  static createState(state, drivers) {
    return _.reduce(drivers, (reduction, driver) => {
      if (_.isFunction(_.get(driver, 'createState'))) {
        return driver.createState(reduction, drivers);
      }
      return reduction;
    }, state);
  }

  static composeReducer(state, drivers) {
    // return enableChangeHandling(
    //   enableBatching(combineReducers(reducers)),
    //   combineHandlers(handlers)
    // );
    return _.reduce(drivers, (reducer, driver) => {
      if (_.isFunction(_.get(driver, 'composeReducer'))) {
        return driver.composeReducer(reducer, state, drivers);
      }
      return reducer;
    }, PASS);
  }

  static composeEnhancer(state, drivers) {
    return _.reduce(drivers, (enhancer, driver) => {
      if (_.isFunction(_.get(driver, 'composeEnhancer'))) {
        return driver.composeEnhancer(enhancer, state, drivers);
      }
      return enhancer;
    }, PASS);
  }

  static replaceReducer(reducer) {
    Engine.store.replaceReducer(reducer);
  }

  static updateStore() {
    const handlers    = Engine.createHandlers();
    const reducers    = Engine.createReducers();

    return Engine.replaceReducer(Engine.composeReducer(reducers, handlers));
  }
}
