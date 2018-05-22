import { call, put } from 'redux-saga/effects'
import { setAppState } from '../actions'
import watchAppStateChannel from './watchAppStateChannel'

function* monitorAppStateChannel() {
  yield call(watchAppStateChannel, function* (appState) {
    yield put(setAppState(appState))
  })
}

export default monitorAppStateChannel
