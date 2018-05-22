import { call } from 'redux-saga/effects'
import reducer from './reducer'
import { setupAppState } from './util'

function* setup() {
  return yield call(setupAppState)
}

export default {
  reducer,
  setup
}
