import createBufferedEventListenerChannel from './createBufferedEventListenerChannel'
import slidingBuffer from './slidingBuffer'

const createSlidingEventListenerChannel = (
  target,
  eventType,
  { length = 1, ...options } = {}
) =>
  createBufferedEventListenerChannel(
    target,
    eventType,
    slidingBuffer(length),
    options
  )

export default createSlidingEventListenerChannel
