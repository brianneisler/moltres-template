import { put, spawn } from 'moltres'
import { setCurrentClock } from './actions'
import { monitorClockChannel } from './util'

function* setup() {
  const frequency = 4000
  yield put(setCurrentClock(Date.now()))
  return yield spawn(monitorClockChannel, frequency)
}

export default setup
