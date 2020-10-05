import { createAction } from '../../../../utils/redux'

const uncaughtSagaErrorAction = createAction(
  'core.UncaughtSagaErrorAction',
  ({ reason, saga }) => ({
    reason,
    saga
  })
)

export default uncaughtSagaErrorAction
