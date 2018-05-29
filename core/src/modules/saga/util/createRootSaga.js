import { map } from 'ramda'
import { all, fork } from 'redux-saga/effects'
import filterSagas from './filterSagas'

const createRootSaga = (store) => {
  return function* rootSaga() {
    const sagas = filterSagas(store.getModules())
    yield all(map((saga) => fork(saga, store), sagas))
  }
}

export default createRootSaga
