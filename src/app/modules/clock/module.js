import { assoc } from '../../../utils/lang'
import { fork, handleActions, put } from '../../../utils/redux'
import { monitorClockChannel } from './util'
import { setCurrentClock } from './actions'

const module = {
  reducer: handleActions(
    {
      [setCurrentClock]: (state, { payload }) =>
        assoc('current', payload.timestamp, state)
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