import call from '../../call'
import { setupApp } from './util'

function* saga(store) {
  const spawns = yield call(setupApp, store)
}


export default saga
