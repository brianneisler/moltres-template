import { call, handleChannel, put } from '../../../utils/redux'
import { documentReadyAction } from '../actions'

import createDocumentReadyChannel from './createDocumentReadyChannel'

function* monitorDocumentReadyChannel(context) {
  const channel = createDocumentReadyChannel()
  yield call(handleChannel, channel, function* () {
    yield put(documentReadyAction(context))
  })
}

export default monitorDocumentReadyChannel
