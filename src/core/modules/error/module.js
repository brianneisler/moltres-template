import { compose } from '../../../utils/lang'
import {
  fork,
  handleAction,
  handleActions,
  put,
  takeEvery
} from '../../../utils/redux'
import withConfig from '../../withConfig'
import withContext from '../../withContext'
import { uncaughtSagaErrorAction } from '../core/actions'

import * as actions from './actions'
import { uncaughtExceptionAction } from './actions'
import * as schemas from './schemas'
import { UncaughtExceptionAction } from './schemas'
import * as selectors from './selectors'
import { monitorUnhandledRejection } from './util'

const enhance = compose(
  withConfig((config) => ({
    config
  })),
  withContext()
)

const mod = () => ({
  actions,
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
  *run() {
    yield fork(monitorUnhandledRejection)

    yield takeEvery(
      uncaughtSagaErrorAction,
      handleAction(
        enhance(function* (context, { payload }) {
          yield put(uncaughtExceptionAction(context, payload))
        })
      )
    )

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
  },
  schemas,
  selectors
})

export default mod
