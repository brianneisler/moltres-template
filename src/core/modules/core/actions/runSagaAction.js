import { createAction } from 'redux-actions'

const runSagaAction = createAction('RUN_SAGA', ({ args, reject, resolve, saga }) => ({
  args,
  reject,
  resolve,
  saga
}))

export default runSagaAction
