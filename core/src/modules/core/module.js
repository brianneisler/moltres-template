import { deferredPromise } from 'moltres-utils'
import createSagaMiddleware from 'redux-saga'
import call from '../../call'
import take from '../../take'
import { runSaga } from '../../actions'
import reducer from './reducer'
import { createAsyncMiddleware, createRootSaga } from './util'

function* run() {
  while (true) {
    const {
      payload: { reject, resolve, saga, args }
    } = yield take(runSaga)
    try {
      // console.log('run - saga:', saga)
      const result = yield call(saga, ...args)
      // console.log('run - result:', result)
      if (resolve) {
        resolve(result)
      }
    } catch (error) {
      if (reject) {
        reject(error)
      } else {
        throw error
      }
    }
  }
}

const module = () => {
  const sagaMiddleware = createSagaMiddleware()
  const middleware = [createAsyncMiddleware(), sagaMiddleware]
  let promise
  let mainTask

  const start = (store) => {
    promise = deferredPromise()
    mainTask = sagaMiddleware.run(createRootSaga(store, { promise }))
  }

  const stop = async () => {
    mainTask.cancel()
    await promise
  }

  return {
    middleware,
    reducer,
    run,
    start,
    stop
  }
}

export default module
