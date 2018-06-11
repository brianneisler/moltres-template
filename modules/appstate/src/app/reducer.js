import { handleActions } from 'moltres'
import { assoc } from 'ramda'
import { setAppState } from '../actions'

const reducer = handleActions({
  [setAppState]: (state, action) =>
    assoc('currentState', action.payload, state)
}, {
  currentState: 0
})

export default reducer
