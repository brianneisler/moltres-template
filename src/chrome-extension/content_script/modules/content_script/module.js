import { getContext } from '../../../../core'
import { createRuntimeMessageChannel } from '../../../../utils/chrome_extension'
import { isAction } from '../../../../utils/lang'
import { put, takeEvery } from '../../../../utils/redux'

import { contentScriptReadyAction } from './actions'

const mod = ({ config }) => ({
  *run() {
    const { frameId, tabId } = config
    const runtimeChannel = createRuntimeMessageChannel()
    yield takeEvery(runtimeChannel, function* (message) {
      if (isAction(message)) {
        yield put(message)
      }
    })

    const context = yield* getContext()
    yield put(
      contentScriptReadyAction(context, { frameId, tabId }),
      runtimeChannel
    )
  }
})

export default mod
