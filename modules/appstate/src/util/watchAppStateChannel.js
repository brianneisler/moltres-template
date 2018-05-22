import { AppState } from 'react-native'
import { eventChannel } from 'redux-saga'
import { call, put, spawn } from 'redux-saga/effects'
import { setAppState } from './actions'
import createAppStateChannel from './createAppStateChannel'


function* watchAppStateChannel(handler) {
  const channel = createAppStateChannel()
  return yield call(watchChannel, channel, handler)
}
