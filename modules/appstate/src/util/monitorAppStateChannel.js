import { call, put, watchChannel } from 'moltres'
import { setAppState } from '../actions'
import createAppStateChannel from './createAppStateChannel'

function* monitorAppStateChannel() {
  const channel = createAppStateChannel()
  return yield call(watchChannel, channel, function* (appState) {
    yield put(setAppState(appState))
  })
}

export default monitorAppStateChannel
