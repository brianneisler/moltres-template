import { buffers, eventChannel } from 'redux-saga'

import { getClientHeight, getScrollHeight } from '../../../../utils/web'

const createScrollClientChannel = (target) => {
  let previousClientHeight = getClientHeight(target)
  let previousScrollHeight = getScrollHeight(target)

  return eventChannel((emitter) => {
    const intervalId = setInterval(() => {
      const clientHeight = getClientHeight(target)
      const scrollHeight = getScrollHeight(target)
      if (
        clientHeight !== previousClientHeight ||
        scrollHeight !== previousScrollHeight
      ) {
        previousClientHeight = clientHeight
        previousScrollHeight = scrollHeight
        emitter({
          target
        })
      }
    }, 200)
    return () => {
      clearInterval(intervalId)
    }
  }, buffers.sliding(1))
}

export default createScrollClientChannel
