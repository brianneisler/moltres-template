import call from '../../../call'
import runStore from './runStore'

const createRootSaga = (store) => {
  return function* rootSaga() {
    const spawns = yield call(runStore, store)
    // TODO BRN: on app termination we should cancel all spawned tasks
  }
}

export default createRootSaga
