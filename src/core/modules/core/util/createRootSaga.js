import { call, cancel, take } from '../../../../utils/lang'
import runStore from './runStore'

const createRootSaga = (store, { promise }) => {
  return function* rootSaga() {
    let spawns = []
    try {
      spawns = yield call(runStore, store)
      // NOTE BRN: This event never occurs, here we simply wait until the task
      // is cancelled, which will end this take.
      yield take('WAIT_TILL_CANCELLED')
    } finally {
      // TODO BRN: Need to make sure that yielding on a cancel actually waits
      // until that cancellation is complete.
      if (spawns.length > 0) {
        yield cancel(spawns)
      }
      promise.resolve()
    }
  }
}

export default createRootSaga
