import { map } from 'ramda'
import all from '../../../all'
import fork from '../../../fork'
import filterSagas from './filterSagas'

const createRootSaga = (store) => {
  return function* rootSaga() {
    const sagas = filterSagas(store.getModules())
    yield all(map((saga) => fork(saga, store), sagas))
  }
}

export default createRootSaga
