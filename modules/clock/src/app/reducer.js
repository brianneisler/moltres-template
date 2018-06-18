import { handleActions } from 'moltres'
import { assoc } from 'moltres-utils'
import { setCurrentClock } from '../actions'

const reducer = handleActions({
  [setCurrentClock]: (state, action) =>
    assoc('current', action.payload, state)
},{
  current: 0
})

export default reducer
