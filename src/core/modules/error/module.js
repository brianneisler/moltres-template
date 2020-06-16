import { UncaughtExceptionAction } from '../../schemas'
import { compose } from '../../../utils/data'
import {
  fork,
  handleAction,
  handleActions,
  takeEvery
} from '../../../utils/lang'
import { monitorUnhandledRejection } from './util'
import withConfig from '../../withConfig'
import withContext from '../../withContext'

const enhance = compose(
  withConfig((config) => ({
    config
  })),
  withContext()
)

const mod = {
  reducer: handleActions(
    {
      [UncaughtExceptionAction.name]: (state, action) => {
        return {
          ...state,
          uncaughtException: action.payload.reason
        }
      }
    },
    {}
  ),
  run: function* run() {
    yield fork(monitorUnhandledRejection)

    yield takeEvery(
      UncaughtExceptionAction.name,
      handleAction(
        enhance(function* (context, { payload }) {
          context.logger.error(payload.reason)
          if (payload.saga) {
            context.logger.error(payload.saga.sagaStack)
          }
        })
      )
    )
  }
}

export default mod
