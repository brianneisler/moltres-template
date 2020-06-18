import call from './call'
import cancelled from './cancelled'
import take from './take'

const handleChannel = function* (channel, handler, onEnd) {
  try {
    while (true) {
      const value = yield take(channel)
      yield call(handler, value)
    }
  } finally {
    if (yield cancelled()) {
      yield call([channel, 'close'])
      if (onEnd) {
        yield call(onEnd)
      }
    }
  }
}

export default handleChannel
