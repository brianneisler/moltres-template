import { call } from 'redux-saga/effects'
import reducer from './reducers'
import { setupApp } from './sagas'

function* saga(modules) {
  const spawns = yield call(setupApp, modules)
}

export default {
  reducer,
  saga
}
