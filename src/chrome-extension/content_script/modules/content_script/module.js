import { getContext } from '../../../../core'
import { waitForDocumentReady } from '../../../../modules/web'
import { createRuntimeChannel } from '../../../../utils/chrome_extension'
import { pipe, put } from '../../../../utils/redux'

import { contentScriptReadyAction } from './actions'

const mod = ({ config }) => ({
  *run() {
    const { frameId, tabId } = config
    const runtimeChannel = createRuntimeChannel()
    yield pipe(runtimeChannel)

    yield waitForDocumentReady()

    const context = yield* getContext()
    yield put(
      runtimeChannel,
      contentScriptReadyAction(context, { frameId, tabId })
    )
  }
})

export default mod
