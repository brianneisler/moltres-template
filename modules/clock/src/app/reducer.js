import { handleActions } from 'moltres'
import { assoc } from 'moltres-utils'
import { setCurrentClock } from '../actions'

const reducer = handleActions({
  [setCurrentClock]: (state, { payload }) =>
    assoc('current', payload.timestamp, state)
},{
  current: 0
})

export default reducer
