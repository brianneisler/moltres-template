import { handleActions } from 'moltres'
import { assoc } from 'ramda'
import { setAppState } from './actions'

export default handleActions({
  [setAppState]: (state, action) =>
    assoc('currentState', action.payload, state)
}, {
  currentState: 0
})
