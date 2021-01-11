import { getContext } from '../../../core'
import { merge } from '../../../utils/lang'
import { fork, handleActions } from '../../../utils/redux'

import { HoverStateChangedAction } from './schemas'
import { monitorHoverState } from './util'

const mod = () => ({
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
  *run() {
    const context = yield* getContext()
    yield fork(monitorHoverState, context)
  }
})

export default mod
