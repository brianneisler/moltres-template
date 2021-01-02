import { call, put, select } from '../../../../../utils/redux'
import { selectTabChannel } from '../selectors'

function* doPutTab({ frameId, tabId }, message) {
  const tabChannel = yield select(selectTabChannel(tabId, frameId))
  if (!tabChannel) {
    throw new Error(
      `could not find channel for tabId:${tabId} and frameId:${frameId}`
    )
  }
  yield put(tabChannel, message)
}

const putTab = (target, message) => call(doPutTab, target, message)

export default putTab
