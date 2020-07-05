import createBufferedEventListenerChannel from './createBufferedEventListenerChannel'
import expandingBuffer from './expandingBuffer'

const createExpandingEventListenerChannel = (
  target,
  eventType,
  { initialSize = 1, ...options } = {}
) =>
  createBufferedEventListenerChannel(
    target,
    eventType,
    expandingBuffer(initialSize),
    options
  )

export default createExpandingEventListenerChannel
