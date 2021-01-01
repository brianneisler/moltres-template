import { curry, getPath } from '../../../../../utils/lang'
import { getTabKey } from '../utils'

const selectTabChannel = curry((tabId, frameId, state) =>
  getPath(['content_script', 'channels', getTabKey({ frameId, tabId })], state)
)

export default selectTabChannel
