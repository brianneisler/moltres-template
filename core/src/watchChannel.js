import call from './call'
import cancelled from './cancelled'
import take from './take'

const watchChannel = function*(channel, handler) {
  try {
    while (true) {
      const value = yield take(channel)
      yield call(handler, value)
    }
  } finally {
    if (yield cancelled()) {
      yield call([channel, 'close'])
    }
  }
}

export default watchChannel
