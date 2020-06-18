import channel from './channel'
import slidingBuffer from './slidingBuffer'

const lockChannel = () => {
  let locked = false
  let putQueued = false

  const chan = channel(slidingBuffer(1))
  const put = () => {
    if (!locked) {
      putQueued = false
      chan.put({ type: 'refresh' })
    } else {
      putQueued = true
    }
  }

  // The eventChannel that reduces the state uses this to be notified when the
  // state has refreshed and then calls refreshState directly
  // const take = () => {
  //   if (putQueued) {
  //     return Promise.resolve({ type: 'REFRESH_STATE' })
  //   }
  //   return new Promise((resolve) => {
  //     queuedResolve = resolve
  //   })
  // }

  const isLocked = () => {
    return locked
  }

  const lock = () => {
    locked = true
  }

  const release = () => {
    locked = false

    // NOTE BRN: Put to the channel again if something triggered a put while the
    // channel was locked
    if (putQueued) {
      put()
    }
  }

  return {
    close: chan.close,
    flush: chan.flush,
    isLocked,
    lock,
    put,
    release,
    take: chan.take
  }
}

export default lockChannel
