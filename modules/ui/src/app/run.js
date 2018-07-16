import { select, take } from 'moltres'
import { uiInitialized } from '../actions'
import selectUIInitialized from '../selectUIInitialized'

function* run() {
  // TODO BRN: This is no longer blocking to the main run execution
  // need to figure out how to make the app wait for this to complete

  const initialized = yield select(selectUIInitialized)
  if (!initialized) {
    yield take(uiInitialized)
  }
}

export default run
