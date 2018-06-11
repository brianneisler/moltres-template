import { fork, put } from 'moltres'
import { setCurrentClock } from '../actions'
import { monitorClockChannel } from '../util'

function* run() {
  const frequency = 4000
  yield put(setCurrentClock(Date.now()))
  return yield fork(monitorClockChannel, frequency)
}

export default run
