import { externalPromise } from '../../../utils/lang'
import { call, handleActions, take } from '../../../utils/redux'

import * as actions from './actions'
import { runSagaAction, uncaughtSagaErrorAction } from './actions'
import * as schemas from './schemas'
import { CoreConfig } from './schemas'
import {
  createAsyncMiddleware,
  createRootSaga,
  createSagaMiddleware
} from './util'

function* run() {
  while (true) {
    const {
      payload: { args, reject, resolve, saga }
    } = yield take(runSagaAction)
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

const mod = () => {
  let _store
  const sagaMiddleware = createSagaMiddleware({
    onError: (reason, saga) => {
      try {
        _store.dispatch(uncaughtSagaErrorAction({ reason, saga }))
      } catch (error) {
        // NOTE BRN: This is the ultimate fallback in case the above errors out
        // for some reason
        _store.getContext().logger.error(error)
      }
    }
  })
  let promise
  let mainTask

  const setup = (store) => {
    _store = store
  }

  const start = (store) => {
    promise = externalPromise()
    // NOTE BRN: This kicks off all modules as Spawned Tasks which separates
    // them from the main line of execution. This way, if a single module has an
    // error, it does not bring down the entire app.
    mainTask = sagaMiddleware.run(createRootSaga(store, { promise }))
  }

  const stop = async () => {
    mainTask.cancel()
    await promise
  }

  return {
    actions,
    middleware: [
      {
        insert: 'first',
        middleware: createAsyncMiddleware()
      },
      {
        insert: 'last',
        middleware: sagaMiddleware
      }
    ],
    reducer: handleActions(
      {},
      {
        version: 1
      }
    ),
    run,
    schemas,
    setup,
    start,
    stop
  }
}

mod.configSchema = CoreConfig

export default mod
