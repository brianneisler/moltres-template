import { eventChannel } from 'moltres'
import { Dimensions } from 'react-native'

const createDimensionsChannel = () => {
  return eventChannel((emitter) => {
    const listener = (event) => {
      emitter(event)
    }
    Dimensions.addEventListener('change', listener)
    return () => {
      Dimensions.removeEventListener('change', listener)
    }
  })
}

export default createDimensionsChannel
