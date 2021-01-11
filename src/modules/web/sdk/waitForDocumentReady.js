import { call, select, take } from '../../../utils/redux'
import { DocumentReadyAction } from '../schemas'
import { selectIsDocumentReady } from '../selectors'

const doWaitForDocumentReady = function* () {
  const isDocumentReady = yield select(selectIsDocumentReady)
  if (isDocumentReady) {
    return
  }
  yield take(DocumentReadyAction.name)
}

const waitForDocumentReady = () => call(doWaitForDocumentReady)

export default waitForDocumentReady
