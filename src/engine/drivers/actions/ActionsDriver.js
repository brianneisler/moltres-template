import _ from 'mudash';
import { Driver } from '../../../driver';
import { createAction, handleActions } from 'redux-actions';

const SET_ACTIONS = 'SET_ACTIONS';

export default class ActionsDriver extends Driver {

  createActions() {
    return {
      setActions: createAction(SET_ACTIONS)
    };
  }

  createReducer() {
    return handleActions({
      [SET_ACTIONS]: (state, action) => _.merge(state, {
        actions: _.merge(_.get(state, 'actions'), action.payload)
      })
    }, this.state);
  }

  createState(state, drivers) {
    return {
      ...state,
      actions: this.generateActions(state, drivers)
    };
  }

  generateActions(state, drivers) {
    return _.reduce(drivers, (actions, driver) => {
      if (_.isFunction(_.get(driver, 'createActions'))) {
        return _.merge(actions, driver.createActions(state, drivers));
      }
      return actions;
    }, {});
  }
}
