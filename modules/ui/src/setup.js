import { select, take } from 'moltres'
import { uiInitialized } from './actions'
import selectUIInitialized from './selectUIInitialized'

function* setup() {
  const initialized = yield select(selectUIInitialized)
  if (!initialized) {
    yield take(uiInitialized)
  }
}

export default setup
