import { getContext } from '../../core'
import { assocPath } from '../../utils/lang'
import { fork, handleActions } from '../../utils/redux'

import { DocumentReadyAction } from './schemas'
import { monitorDocumentReadyChannel } from './utils'

const mod = () => ({
  reducer: handleActions(
    {
      [DocumentReadyAction.name]: (state) =>
        assocPath(['web', 'isDocumentReady'], true, state)
    },
    {
      channels: {}
    }
  ),
  *run() {
    const context = yield* getContext()
    yield fork(monitorDocumentReadyChannel, context)
  }
})

export default mod
