import { select, take } from 'moltres'
import { uiInitialized } from '../actions'
import selectUIInitialized from '../selectUIInitialized'

function* run() {
  const initialized = yield select(selectUIInitialized)
  if (!initialized) {
    yield take(uiInitialized)
  }
}

export default run
