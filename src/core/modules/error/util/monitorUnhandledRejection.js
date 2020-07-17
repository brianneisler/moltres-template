import { call, handleChannel, put } from '../../../../utils/redux'
import { identity } from '../../../../utils/lang'
import { uncaughtExceptionAction } from '../actions'
import createUnhandledRejectionChannel from './createUnhandledRejectionChannel.ssr'
import getContext from '../../../getContext'

function* monitorUnhandledRejection() {
  const channel = createUnhandledRejectionChannel()
  yield call(handleChannel, channel, function* (event) {
    const context = yield* getContext(identity)
    yield put(uncaughtExceptionAction(context, event))
  })
}

export default monitorUnhandledRejection
