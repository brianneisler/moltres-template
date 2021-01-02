import { getContext } from '../../../../core'
import { createRuntimeMessageChannel } from '../../../../utils/chrome_extension'
import { pipe, put } from '../../../../utils/redux'

import { contentScriptReadyAction } from './actions'

const mod = ({ config }) => ({
  *run() {
    const { frameId, tabId } = config
    const runtimeChannel = createRuntimeMessageChannel()
    yield pipe(runtimeChannel)

    const context = yield* getContext()
    yield put(
      runtimeChannel,
      contentScriptReadyAction(context, { frameId, tabId })
    )
  }
})

export default mod
