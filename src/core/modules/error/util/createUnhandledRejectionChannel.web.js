import { eventChannel, expandingBuffer } from '../../../../utils/redux'
import { getWindow } from '../../../../utils/web'

const createUnhandledRejectionChannel = () => {
  return eventChannel((emitter) => {
    const listener = (event) => {
      event.preventDefault()
      emitter(event.detail)
    }
    getWindow().addEventListener('unhandledrejection', listener)
    return () => {
      getWindow().removeEventListener('unhandledrejection', listener)
    }
  }, expandingBuffer(1))
}

export default createUnhandledRejectionChannel
