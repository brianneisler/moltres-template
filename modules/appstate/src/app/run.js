import { fork, put } from 'moltres'
import { AppState } from 'react-native'
import { setAppState } from '../actions'
import { monitorAppStateChannel } from '../util'

function* run() {
  yield put(setAppState(AppState.currentState))
  yield fork(monitorAppStateChannel)
}

export default run
