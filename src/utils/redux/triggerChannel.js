import channel from './channel'
import slidingBuffer from './slidingBuffer'

const triggerChannel = () => {
  return channel(slidingBuffer(1))
}

export default triggerChannel
