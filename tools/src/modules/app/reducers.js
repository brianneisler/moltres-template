import { assoc } from 'ramda'
import { handleActions } from 'redux-actions'
import { setAppState } from './actions'

export default handleActions({
  [setAppState]: (state, action) =>
    assoc('state', action.payload, state)
}, {
  state: 0
})
