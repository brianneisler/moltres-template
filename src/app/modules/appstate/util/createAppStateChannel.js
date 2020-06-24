import { AppState } from 'react-native'
import { eventChannel, expandingBuffer } from '../../../../utils/redux'

const createAppStateChannel = () => {
  return eventChannel((emitter) => {
    const listener = (nextAppState) => {
      emitter(nextAppState)
    }
    AppState.addEventListener('change', listener)
    return () => {
      AppState.removeEventListener('change', listener)
    }
  }, expandingBuffer(1))
}

export default createAppStateChannel
