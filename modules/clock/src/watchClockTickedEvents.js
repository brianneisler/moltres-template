import { actionChannel, buffers, call, watchChannel } from 'moltres'
import { clockTicked } from './actions'

function* watchClockTickedEvents(handler) {
  const channel = yield actionChannel(clockTicked, buffers.sliding(1))
  return yield call(watchChannel, channel, handler)
}

export default watchClockTickedEvents
