import { buffers, eventChannel } from 'redux-saga'

const createScrollChannel = (target) => {
  return eventChannel((emitter) => {
    const listener = (event) => {
      emitter(event)
    }
    target.addEventListener('scroll', listener)
    return () => {
      target.removeEventListener('scroll', listener)
    }
  }, buffers.sliding(1))
}

export default createScrollChannel
