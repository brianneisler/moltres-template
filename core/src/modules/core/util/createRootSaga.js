import call from '../../../call'
import setConfig from '../../../setConfig'
import setContext from '../../../setContext'
import runStore from './runStore'

const createRootSaga = (store) => {
  return function* rootSaga() {
    yield setContext(store.getContext())
    yield setConfig(store.getConfig())
    const spawns = yield call(runStore, store)
    // TODO BRN: on app termination we should cancel all spawned tasks
  }
}

export default createRootSaga
