import { call, handleChannel, put } from '../../../../utils/redux'
import { clockTicked, setCurrentClock } from '../actions'

import createClockChannel from './createClockChannel'

function* monitorClockChannel(frequency) {
  const channel = createClockChannel(frequency)
  yield call(handleChannel, channel, function* (timestamp) {
    yield put(setCurrentClock(timestamp))
    yield put(clockTicked())
  })
}

export default monitorClockChannel
