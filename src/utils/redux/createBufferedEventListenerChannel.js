import eventChannel from './eventChannel'

const createBufferedEventListenerChannel = (
  target,
  eventType,
  buffer,
  options = {}
) => {
  return eventChannel((emitter) => {
    const listener = (event) => {
      emitter(event)
    }
    target.addEventListener(eventType, listener, options)
    return () => {
      target.removeEventListener(eventType, listener)
    }
  }, buffer)
}

export default createBufferedEventListenerChannel
