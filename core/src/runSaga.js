import { runSaga as runSagaAction } from './actions'

const runSaga = async (engine, saga, ...args) => new Promise((resolve, reject) =>
  engine.dispatch(runSagaAction({ reject, resolve, saga, args }))
)

export default runSaga
