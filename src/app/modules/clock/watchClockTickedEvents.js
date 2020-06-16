import {
  actionChannel,
  call,
  handleChannel,
  slidingBuffer
} from '../../../utils/lang'
import { clockTicked } from './actions'

function* watchClockTickedEvents(handler) {
  const channel = yield actionChannel(clockTicked, slidingBuffer(1))
  return yield call(handleChannel, channel, handler)
}

export default watchClockTickedEvents
