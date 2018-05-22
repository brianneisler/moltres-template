import { AppState } from 'react-native'
import { eventChannel } from 'redux-saga'
import { call, put, spawn } from 'redux-saga/effects'
import { setAppState } from './actions'
import watchChannel from '../../util/watchChannel'


export function* setupAppState() {
  yield put(setAppState(AppState.currentState))
  return yield spawn(monitorAppStateChannel)
}

export function* monitorAppStateChannel() {
  yield call(watchAppStateChannel, function* (appState) {
    yield put(setAppState(appState))
  })
}

export function* watchAppStateChannel(handler) {
  const channel = createAppStateChannel()
  return yield call(watchChannel, channel, handler)
}

export function createAppStateChannel() {
  return eventChannel((emitter) => {
    const listener = (nextAppState) => {
      emitter(nextAppState)
    }
    AppState.addEventListener('change', listener)
    return () => {
      AppState.removeEventListener('change', listener)
    }
  })
}
