import { assocProp } from '../../../utils/data'
import { fork, handleActions, put } from '../../../utils/lang'
import { monitorClockChannel } from './util'
import { setCurrentClock } from './actions'

const module = {
  reducer: handleActions(
    {
      [setCurrentClock]: (state, { payload }) => assocProp('current', payload.timestamp, state)
    },
    {
      current: 0
    }
  ),
  run: function* run() {
    const frequency = 4000
    yield put(setCurrentClock(Date.now()))
    return yield fork(monitorClockChannel, frequency)
  }
}

export default module
