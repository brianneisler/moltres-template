import { buffers, eventChannel } from 'redux-saga'
import {
  actionChannel,
  call,
  put,
  spawn
} from 'redux-saga/effects'
import { clockTicked, setCurrentClock } from './actions'
import watchChannel from '../../util/watchChannel'


export function* setupClock() {
  yield put(setCurrentClock(Date.now()))
  return yield spawn(monitorClock)
}

function* monitorClock() {
  return yield call(watchClockChannel, handleClock)
}

function* handleClock(timestamp) {
  yield put(setCurrentClock(timestamp))
  yield put(clockTicked())
}

export function* watchClockTickedEvents(handler) {
  const channel = yield actionChannel(clockTicked, buffers.sliding(1))
  return yield call(watchChannel, channel, handler)
}

export function* watchClockChannel(handler) {
  const channel = createClockChannel()
  return yield call(watchChannel, channel, handler)
}

export function createClockChannel() {
  return eventChannel((emitter) => {
    const interval = setInterval(() => {
      emitter(Date.now())
    }, 4000)
    return () => {
      clearInterval(interval)
    }
  })
}
