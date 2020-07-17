import { call, handleChannel, put } from '../../../../utils/redux'
import { setAppState } from '../actions'

import createAppStateChannel from './createAppStateChannel'

function* monitorAppStateChannel() {
  const channel = createAppStateChannel()
  yield call(handleChannel, channel, function* (appState) {
    yield put(setAppState(appState))
  })
}

export default monitorAppStateChannel
