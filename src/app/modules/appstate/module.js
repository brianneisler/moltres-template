import { AppState } from 'react-native'
import { assoc } from '../../../utils/data'
import { fork, handleActions, put } from '../../../utils/lang'
import { monitorAppStateChannel } from './util'
import { setAppState } from './actions'

const module = {
  reducer: handleActions(
    {
      [setAppState]: (state, action) =>
        assoc('currentState', action.payload, state)
    },
    {
      currentState: 0
    }
  ),
  run: function* run() {
    yield put(setAppState(AppState.currentState))
    yield fork(monitorAppStateChannel)
  }
}

export default module
