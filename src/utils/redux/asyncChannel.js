import { isFunction, once } from '../lang'

import call from './call'
import channel from './channel'
import noneBuffer from './noneBuffer'

const asyncChannel = function* (subscribe, buffer = noneBuffer()) {
  let unsubscribe

  const chan = channel(buffer)
  const close = function* () {
    if (isFunction(unsubscribe)) {
      yield call(unsubscribe)
    }
    chan.close()
  }

  unsubscribe = yield call(subscribe, (input) => {
    chan.put(input)
  })

  if (!isFunction(unsubscribe)) {
    throw new Error(
      'in eventChannel: subscribe should return a function to unsubscribe'
    )
  }

  unsubscribe = once(unsubscribe)

  return {
    close,
    flush: chan.flush,
    take: chan.take
  }
}

export default asyncChannel
