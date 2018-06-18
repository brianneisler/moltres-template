import { handleActions } from 'moltres'
import { assoc } from 'moltres-utils'
import { uiDeinitialized, uiInitialized } from './actions'

const reducer = handleActions({
  [uiDeinitialized]: (state) => assoc('initialized', false, state),
  [uiInitialized]: (state) => assoc('initialized', true, state)
}, {
  initialized: false
})

export default reducer
