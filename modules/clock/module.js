import { call } from 'redux-saga/effects'
import reducer from './reducers'
import { setupClock } from './sagas'

function* setup() {
  return yield call(setupClock)
}

export default {
  reducer,
  setup
}
