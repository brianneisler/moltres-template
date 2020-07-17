import { assoc } from '../../../utils/lang'
import { handleActions, select, take } from '../../../utils/redux'
import { uiDeinitialized, uiInitialized } from './actions'
import selectUIInitialized from './selectUIInitialized'

const mod = {
  reducer: handleActions(
    {
      [uiDeinitialized]: (state) => assoc('initialized', false, state),
      [uiInitialized]: (state) => assoc('initialized', true, state)
    },
    {
      initialized: false
    }
  ),
  run: function* run() {
    // TODO BRN: This is no longer blocking to the main run execution
    // need to figure out how to make the app wait for this to complete

    const initialized = yield select(selectUIInitialized)
    if (!initialized) {
      yield take(uiInitialized)
    }
  }
}

export default mod
