import { HoverStateChangedAction } from './schemas'
import { fork, handleActions } from '../../../utils/redux'
import { merge } from '../../../utils/lang'
import { monitorHoverState } from './util'

const mod = {
  reducer: handleActions(
    {
      [HoverStateChangedAction.type]: (state, { payload }) => {
        // TODO BRN: Update merge to hadle these kinds of cases
        if (state.isEnabled !== payload.isEnabled) {
          return merge(state, payload)
        }
        return state
      }
    },
    {
      isEnabled: false
    }
  ),
  run: function* run() {
    yield fork(monitorHoverState)
  }
}

export default mod
