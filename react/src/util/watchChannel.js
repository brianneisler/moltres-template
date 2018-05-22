import { call, take } from 'redux-saga/effects'

export default function* watchChannel(channel, handler) {
  while (true) {
    const value = yield take(channel)
    yield call(handler, value)
  }
}
