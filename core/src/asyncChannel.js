import { isFunction, once } from 'moltres-utils'
import buffers from './buffers'
import call from './call'
import channel from './channel'


const asyncChannel = function*(subscribe, buffer = buffers.none()) {
  let unsubscribe

  const chan = channel(buffer)
  const close = function*() {
    if (isFunction(unsubscribe)) {
      yield call(unsubscribe)
    }
    chan.close()
  }

  unsubscribe = yield call(subscribe, (input) => {
    chan.put(input)
  })

  if (!isFunction(unsubscribe)) {
    throw new Error('in eventChannel: subscribe should return a function to unsubscribe')
  }

  unsubscribe = once(unsubscribe)

  return {
    take: chan.take,
    flush: chan.flush,
    close
  }
}

export default asyncChannel
