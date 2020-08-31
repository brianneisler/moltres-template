import { assoc } from '../../../utils/lang'
import { handleActions, select, take } from '../../../utils/redux'

import { UIDeinitializedAction, UIInitializedAction } from './schemas'
import { selectUIInitialized } from './selectors'

const mod = {
  reducer: handleActions(
    {
      [UIDeinitializedAction.name]: (state) =>
        assoc('initialized', false, state),
      [UIInitializedAction.name]: (state) => assoc('initialized', true, state)
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
      yield take(UIInitializedAction.name)
    }
  }
}

export default mod
