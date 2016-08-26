import _ from 'mudash'
import { Driver } from '../../../driver'
import { mapReducer } from '../../../util'
import { createAction, handleActions } from 'redux-actions'

const SET_ACTIONS = 'SET_ACTIONS'
const UPDATE_ACTIONS = 'UPDATE_ACTIONS'

export default class ActionsDriver extends Driver {

  createActions() {
    return {
      setActions: createAction(SET_ACTIONS),
      updateActions: createAction(UPDATE_ACTIONS)
    }
  }

  createReducer() {
    return mapReducer({
      actions: handleActions({
        [SET_ACTIONS]: (state, action) => action.payload,
        [UPDATE_ACTIONS]: (state, action) => ({
          ...state,
          ...action.payload
        })
      })
    })
  }

  createState(state, drivers) {
    return {
      ...state,
      actions: this.generateActions(state, drivers)
    }
  }

  generateActions(state, drivers) {
    return _.reduce(drivers, (actions, driver) => {
      if (_.isFunction(_.get(driver, 'createActions'))) {
        return _.merge(actions, driver.createActions(state, drivers))
      }
      return actions
    }, {})
  }
}
