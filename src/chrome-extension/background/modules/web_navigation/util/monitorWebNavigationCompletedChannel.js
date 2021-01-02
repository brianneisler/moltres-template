import { call, handleChannel, put } from '../../../../../utils/redux'
import { webNavigationCompletedAction } from '../actions'

import createWebNavigationCompletedChannel from './createWebNavigationCompletedChannel'

function* monitorWebNavigationCompletedChannel(context) {
  const channel = createWebNavigationCompletedChannel()
  yield call(handleChannel, channel, function* (data) {
    yield put(webNavigationCompletedAction(context, data))
  })
}

export default monitorWebNavigationCompletedChannel
