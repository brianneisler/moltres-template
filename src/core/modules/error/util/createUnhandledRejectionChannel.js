import { eventChannel, slidingBuffer } from '../../../../utils/lang'

const createUnhandledRejectionChannel = () => {
  return eventChannel((emitter) => {
    const listener = (reason, promise) => {
      emitter({ promise, reason })
    }
    process.on('unhandledRejection', listener)
    return () => {
      process.removeListener('unhandledRejection', listener)
    }
  }, slidingBuffer(1))
}

export default createUnhandledRejectionChannel
