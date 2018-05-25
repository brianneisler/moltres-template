import { put, spawn } from 'moltres'
import { AppState } from 'react-native'
import { setAppState } from '../actions'

function* setup() {
  yield put(setAppState(AppState.currentState))
  return yield spawn(monitorAppStateChannel)
}

export default setup
