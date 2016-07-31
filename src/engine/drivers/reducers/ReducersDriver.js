import _ from 'mudash';
import { Driver } from '../../../driver';

export default class ReducersDriver extends Driver {

  composeReducer(reducer, state) {
    const reducers = _.get(state, 'reducers');
    return _.compose(..._.reverse(reducers), reducer);
  }

  createState(state, drivers) {
    return {
      ...state,
      reducers: this.generateReducers(state, drivers)
    };
  }

  generateReducers(state, drivers) {
    //TODO BRN: Not sure that this model makes the most sense
    // Reducers should be able to affect any portion of state that they want. How to declare that?
    return _.reduce(drivers, (reducers, driver) => {
      if (_.isFunction(_.get(driver, 'createReducer'))) {
        const { name } = driver.info;
        const reducer = driver.createReducer();
        if (name && reducer) {
          return _.set(reducers, name, reducer);
        }
      }
      return reducers;
    }, {});
  }
}
