import { AppState } from 'react-native'

import { assoc } from '../../../utils/lang'
import { fork, handleActions, put } from '../../../utils/redux'

import { setAppState } from './actions'
import { monitorAppStateChannel } from './util'

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
