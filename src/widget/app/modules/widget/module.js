import { getContext } from '../../../../core'
import { waitForDocumentReady } from '../../../../modules/web'
import { assocProperty } from '../../../../utils/lang'
import { handleActions, pipe, put } from '../../../../utils/redux'
import { createWindowChannel } from '../../../../utils/web'

import { widgetReadyAction } from './actions'
import { WidgetState } from './constants'
import { WidgetReadyAction } from './schemas'

const mod = ({ config }) => ({
  reducer: handleActions(
    {
      [WidgetReadyAction.name]: (state) =>
        assocProperty('state', WidgetState.READY, state)
    },
    {
      state: WidgetState.INITIALIZING
    }
  ),
  *run() {
    const { frameId, tabId } = config
    const windowChannel = createWindowChannel()
    yield pipe(windowChannel)

    yield waitForDocumentReady()

    const context = yield* getContext()
    yield put(windowChannel, widgetReadyAction(context, { frameId, tabId }))
  }
})

export default mod
