import call from './call'
import take from './take'

function* watchChannel(channel, handler) {
  while (true) {
    const value = yield take(channel)
    yield call(handler, value)
  }
}

export default watchChannel
