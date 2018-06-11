import createSagaMiddleware from 'redux-saga'
import call from '../../call'
import take from '../../take'
import { runSaga } from '../../actions'
import reducer from './reducer'
import { createRootSaga } from './util'

function* run() {
  while (true) {
    const { payload: { reject, resolve, saga, args } } = yield take(runSaga)
    try {
      const result = yield call(saga, ...args)
      if (resolve) {
        resolve(result)
      }
    } catch(error) {
      if (reject) {
        reject(error)
      } else {
        throw error
      }
    }
  }
}

const module = () => {
  const middleware  = createSagaMiddleware()

  const start = (store) => {
    middleware.run(createRootSaga(store))
  }

  return {
    middleware,
    reducer,
    run,
    start
  }
}

export default module
