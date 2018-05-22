import { select, take } from 'redux-saga/effects'
import { uiInitialized } from './actions'
import { selectUIInitialized } from './selectors'


export function* setupUI() {
  const initialized = yield select(selectUIInitialized)
  if (!initialized) {
    yield take(uiInitialized)
  }
}
