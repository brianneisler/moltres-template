import { map } from 'ramda'
import { all, fork } from 'redux-saga/effects'
import filterSagas from './filterSagas'

const createRootSaga = (modules) => {
  return function* rootSaga() {
    const sagas = filterSagas(modules)
    yield all(map((saga) => fork(saga, modules), sagas))
  }
}

export default createRootSaga
