import { merge } from 'moltres/lang'
import { fork, handleActions } from 'moltres/redux'

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
    yield fork(monitorHoverState)
  }
})

export default mod
