import jQuery from 'jquery'

import { eventChannel, expandingBuffer } from '../../../utils/redux'
import { getDocument } from '../../../utils/web'

const createDocumentReadyChannel = () => {
  return eventChannel((emitter) => {
    const listener = (data) => {
      emitter(data)
    }
    jQuery(getDocument()).ready(listener)
    return () => {
      // TODO BRN: There does not appear to be a way to remove this listener
    }
  }, expandingBuffer(1))
}

export default createDocumentReadyChannel
