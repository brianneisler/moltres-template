import {
  all,
  call,
  createSlidingEventListenerChannel,
  handleChannel,
  put,
  select
} from '../../../../utils/redux'
import { canUseDOM } from '../../../../utils/web'
import { hoverStateChangedAction } from '../actions'
import { selectHoverIsEnabled } from '../selectors'

/**
 * Web browsers emulate mouse events (and hover states) after touch events.
 * This code infers when the currently-in-use modality supports hover
 * (including for multi-modality devices) and considers "hover" to be enabled
 * if a mouse movement occurs more than 1 second after the last touch event.
 * This threshold is long enough to account for longer delays between the
 * browser firing touch and mouse events on low-powered devices.
 */
const HOVER_THRESHOLD_MS = 1000

function* monitorHoverState() {
  if (canUseDOM()) {
    const touchStartChannel = createSlidingEventListenerChannel(
      document,
      'touchstart',
      {
        capture: true
      }
    )
    const touchMoveChannel = createSlidingEventListenerChannel(
      document,
      'touchmove',
      {
        capture: true
      }
    )
    const mouseMoveChannel = createSlidingEventListenerChannel(
      document,
      'mousemove',
      {
        capture: true
      }
    )

    let lastTouchTimestamp = 0
    const enableHover = function* () {
      const isEnabled = yield select(selectHoverIsEnabled)
      if (isEnabled || Date.now() - lastTouchTimestamp < HOVER_THRESHOLD_MS) {
        return
      }
      yield put(hoverStateChangedAction({ isEnabled: true }))
    }

    const disableHover = function* () {
      const isEnabled = yield select(selectHoverIsEnabled)
      lastTouchTimestamp = Date.now()
      if (isEnabled) {
        yield put(hoverStateChangedAction({ isEnabled: false }))
      }
    }

    yield all([
      call(handleChannel, touchStartChannel, disableHover),
      call(handleChannel, touchMoveChannel, disableHover),
      call(handleChannel, mouseMoveChannel, enableHover)
    ])
  }
}

export default monitorHoverState
