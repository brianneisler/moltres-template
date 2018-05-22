import createSagaMiddleware from 'redux-saga'
import call from '../../call'
import take from '../../take'
import { runSaga } from './actions'
import createRootSaga from './util/createRootSaga'

function* _saga() {
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

  const run = (modules) =>  {
    middleware.run(createRootSaga(modules))
  }

  return {
    middleware,
    run,
    saga: _saga
  }
}

export default module
