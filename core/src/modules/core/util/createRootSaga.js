import { map } from 'moltres-utils'
import all from '../../../all'
import call from '../../../call'
import cancel from '../../../cancel'
import setConfig from '../../../setConfig'
import setContext from '../../../setContext'
import take from '../../../take'
import runStore from './runStore'

const createRootSaga = (store, { promise }) => {
  return function* rootSaga() {
    let spawns
    try {
      yield setContext(store.getContext())
      yield setConfig(store.getConfig())
      spawns = yield call(runStore, store)
      yield take('WAIT_TILL_CANCELLED')
    } finally {
      yield all(map(cancel, spawns))
      promise.resolve()
    }
  }
}

export default createRootSaga
