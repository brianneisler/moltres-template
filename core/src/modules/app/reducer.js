import { assoc } from 'ramda'
import { setAppState } from '../../actions'
import handleActions from '../../handleActions'

const reducer = handleActions({
  [setAppState]: (state, action) =>
    assoc('state', action.payload, state)
}, {
  state: 0
})

export default reducer
