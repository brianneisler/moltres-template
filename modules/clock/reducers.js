import { assoc } from 'ramda'
import { handleActions } from 'redux-actions'
import { setCurrentClock } from './actions'

export default handleActions({
  [setCurrentClock]: (state, action) =>
    assoc('current', action.payload, state)
},{
  current: 0
})
