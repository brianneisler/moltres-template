import { put, watchChannel } from 'moltres'
import { clockTicked, setCurrentClock } from '../actions'
import createClockChannel from './createClockChannel'

function* monitorClockChannel(frequency) {
  const channel = createClockChannel(frequency)
  yield watchChannel(channel, function* (timestamp) {
    yield put(setCurrentClock(timestamp))
    yield put(clockTicked())
  })
}

export default monitorClockChannel
