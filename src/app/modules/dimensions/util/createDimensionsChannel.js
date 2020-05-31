import { Dimensions } from 'react-native'
import { buffers, eventChannel } from 'redux-saga'

const createDimensionsChannel = () => {
  return eventChannel((emitter) => {
    const listener = (event) => {
      emitter(event)
    }
    Dimensions.addEventListener('change', listener)
    return () => {
      Dimensions.removeEventListener('change', listener)
    }
  }, buffers.sliding(1))
}

export default createDimensionsChannel
