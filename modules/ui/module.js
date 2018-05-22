import { call } from 'redux-saga/effects'
import reducer from './reducers'
import { setupUI } from './sagas'


export function* setup() {
  return yield call(setupUI)
}

export default {
  reducer,
  setup
}
