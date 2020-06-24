import { Dimensions } from 'react-native'
import { eventChannel, slidingBuffer } from '../../../../utils/redux'

const createDimensionsChannel = () => {
  return eventChannel((emitter) => {
    const listener = (event) => {
      emitter(event)
    }
    Dimensions.addEventListener('change', listener)
    return () => {
      Dimensions.removeEventListener('change', listener)
    }
  }, slidingBuffer(1))
}

export default createDimensionsChannel
