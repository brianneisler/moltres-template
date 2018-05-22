import { assoc } from 'ramda'
import { setAppState } from './actions'
import handleActions from '../../handleActions'

export default handleActions({
  [setAppState]: (state, action) =>
    assoc('state', action.payload, state)
}, {
  state: 0
})
