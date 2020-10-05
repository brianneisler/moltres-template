import { createAction } from '../../../../utils/redux'

const runSagaAction = createAction(
  'core.RunSagaAction',
  ({ args, reject, resolve, saga }) => ({
    args,
    reject,
    resolve,
    saga
  })
)

export default runSagaAction
