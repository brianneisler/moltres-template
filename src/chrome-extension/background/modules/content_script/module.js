import { withConfig, withContext } from '../../../../core'
import {
  createTabChannel,
  executeTabScript,
  sendTabMessage
} from '../../../../utils/chrome_extension'
import {
  assocPath,
  assocProperty,
  compose,
  hasProperty
} from '../../../../utils/lang'
import {
  call,
  handleAction,
  handleActions,
  pipe,
  put,
  take,
  takeEvery
} from '../../../../utils/redux'
import { ContentScriptReadyAction } from '../../../content_script/modules/content_script/schemas'
import { WebNavigationCompletedAction } from '../web_navigation'

import {
  initContentScriptAction,
  runContentScriptAction,
  setTabChannelAction
} from './actions'
import { RunContentScriptAction, SetTabChannelAction } from './schemas'
import { getTabKey } from './utils'

const enhance = compose(withConfig(), withContext())

const waitForContentScriptReady = function* (tabChannel) {
  while (true) {
    const next = yield take(tabChannel)
    if (next.type === ContentScriptReadyAction.name) {
      return
    }
  }
}

const mod = () => ({
  reducer: handleActions(
    {
      [SetTabChannelAction.name]: (state, action) =>
        assocPath(
          ['channels', getTabKey(action.payload)],
          action.payload,
          state
        )
    },
    {
      channels: {}
    }
  ),
  *run() {
    yield takeEvery(
      RunContentScriptAction.name,
      handleAction(
        enhance(function* (context, { payload }) {
          const { filePath, frameId, tabId } = payload
          const tabChannel = createTabChannel({ frameId, tabId })

          // NOTE BRN: We pause the channel so that outgoing messages will be
          // queue up until the content script has reported that it's ready
          tabChannel.pause()
          yield put(
            setTabChannelAction(context, {
              frameId,
              tabChannel,
              tabId
            })
          )
          yield call(executeTabScript, {
            filePath,
            frameId,
            tabId
          })
          // TODO BRN:
          // - put the channel into state
          // - execute the tab script
          // - replace the INIT message below with an action
          // - create a putTab helper method that retrieves the channel from
          //   state. If the channel does not exist then it throws an error

          // NOTE BRN: Since the channel is paused, we use the lower level
          // sendTabMessage method to init the content_script since it would get
          // stuck in the channel if we used `put`
          sendTabMessage(
            {
              frameId,
              tabId
            },
            initContentScriptAction(context, {
              frameId,
              tabId
            })
          )
          yield call(waitForContentScriptReady, tabChannel)
          tabChannel.resume()

          // NOTE BRN: This pipes all actions from the given channel into the
          // redux store
          yield pipe(tabChannel)
        })
      )
    )

    let contentScripts = {}
    yield takeEvery(
      WebNavigationCompletedAction.name,
      handleAction(
        enhance(function* (context, { payload }) {
          console.log('WebNavigationCompletedAction - payload:', payload)
          if (!hasProperty(getTabKey(payload), contentScripts)) {
            contentScripts = assocProperty(
              getTabKey(payload),
              true,
              contentScripts
            )
            yield put(
              runContentScriptAction(context, {
                filePath: './dist/content_script.js',
                frameId: payload.frameId,
                tabId: payload.tabId
              })
            )
          }
        })
      )
    )
  }
})

export default mod
