import { eventChannel, expandingBuffer } from '../../../../utils/redux'

const createUnhandledRejectionChannel = () => {
  return eventChannel((emitter) => {
    const listener = (reason, promise) => {
      emitter({ promise, reason })
    }
    process.on('unhandledRejection', listener)
    return () => {
      process.removeListener('unhandledRejection', listener)
    }
  }, expandingBuffer(1))
}

export default createUnhandledRejectionChannel
