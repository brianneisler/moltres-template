import { runSagaAction } from './actions'

const runSaga = async (engine, saga, ...args) =>
  new Promise((resolve, reject) =>
    engine.dispatch(runSagaAction({ args, reject, resolve, saga }))
  )

export default runSaga
