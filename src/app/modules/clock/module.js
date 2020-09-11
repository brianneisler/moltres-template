import { assoc } from '../../../utils/lang'
import { fork, handleActions, put } from '../../../utils/redux'

import { setCurrentClock } from './actions'
import { monitorClockChannel } from './util'

const mod = () => ({
  reducer: handleActions(
    {
      [setCurrentClock]: (state, { payload }) =>
        assoc('current', payload.timestamp, state)
    },
    {
      current: 0
    }
  ),
  *run() {
    const frequency = 4000
    yield put(setCurrentClock(Date.now()))
    return yield fork(monitorClockChannel, frequency)
  }
})

export default mod
