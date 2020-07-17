import { assocPath, createPath, getPath, mergeRight } from '../../utils/lang'

import combineReducers from './combineReducers'
import composeStore from './composeStore'
import filterEnhancers from './filterEnhancers'
import filterReducers from './filterReducers'

const buildReducer = (reducer) => (state, action) => {
  state = reducer(state, action)
  // NOTE BRN: These actions are handled at the root at the very end of reducing
  // so that they can modify the state AFTER all reducers have updated the state.
  if (action) {
    if (action.type === 'ASSOC_STATE') {
      return assocPath(
        createPath(action.payload.path),
        action.payload.state,
        state
      )
    } else if (action.type === 'MERGE_STATE') {
      const statePath = createPath(action.payload.path)
      const currentState = getPath(statePath, state) || {}
      return assocPath(
        statePath,
        mergeRight(currentState, action.payload.state),
        state
      )
    }
  }
  return state
}

const buildStore = (modules, initialState) =>
  composeStore(
    buildReducer(combineReducers(filterReducers(modules))),
    filterEnhancers(modules),
    initialState
  )

export default buildStore
