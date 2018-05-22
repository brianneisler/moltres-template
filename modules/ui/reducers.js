import { assoc } from 'ramda'
import { handleActions } from 'redux-actions'
import { uiDeinitialized, uiInitialized } from './actions'

export default handleActions({
  [uiDeinitialized]: (state) => assoc('initialized', false, state),
  [uiInitialized]: (state) => assoc('initialized', true, state)
}, {
  initialized: false
})
