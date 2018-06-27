import { handleActions } from 'moltres'
import { assoc } from 'moltres-utils'
import { setAppState } from '../actions'

const reducer = handleActions(
  {
    [setAppState]: (state, action) => assoc('currentState', action.payload, state)
  },
  {
    currentState: 0
  }
)

export default reducer
