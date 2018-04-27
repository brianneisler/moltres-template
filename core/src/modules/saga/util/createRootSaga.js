import { map } from 'ramda'
import { all, fork } from 'redux-saga/effects'
import gatherSagas from './gatherSagas'

const createRootSaga = (modules) => {
  return function* rootSaga() {
    const sagas = gatherSagas(modules)
    yield all(map((saga) => fork(saga, modules), sagas))
  }
}

export default createRootSaga
