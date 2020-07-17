import { eventChannel, expandingBuffer } from '../utils/redux'

const createQueryChannel = (query) => {
  return eventChannel((emitter) => {
    const observer = {
      error: (error) => {
        emitter({
          error,
          query
        })
      },
      next: (snapshot) => {
        emitter({
          query,
          snapshot
        })
      }
    }
    const unsubscribe = query.onSnapshot(observer)
    return unsubscribe
  }, expandingBuffer(1))
}

export default createQueryChannel
