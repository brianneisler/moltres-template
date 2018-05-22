import { AppState } from 'react-native'
import { put, spawn } from 'redux-saga/effects'
import { setAppState } from '../actions'

function* setupAppState() {
  yield put(setAppState(AppState.currentState))
  return yield spawn(monitorAppStateChannel)
}

export default setupAppState
