import { createRuntimeMessageChannel } from '../../../../../utils/chrome_extension'
import { call, handleChannel, put } from '../../../../../utils/redux'
import { runtimeMessageReceivedAction } from '../actions'

function* monitorRuntimeMessageChannel(context) {
  const channel = createRuntimeMessageChannel()
  yield call(handleChannel, channel, function* (data) {
    yield put(runtimeMessageReceivedAction(context, data))
  })
}

export default monitorRuntimeMessageChannel
