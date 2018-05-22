import { call } from 'redux-saga/effects'
import reducer from './reducers'
import { setupDimensions } from './sagas'

export function* setup() {
  return yield call(setupDimensions)
}

export default {
  reducer,
  setup
}
