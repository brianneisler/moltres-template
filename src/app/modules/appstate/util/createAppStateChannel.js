import { AppState } from 'react-native'
import { buffers, eventChannel } from 'redux-saga'

const createAppStateChannel = () => {
  return eventChannel((emitter) => {
    const listener = (nextAppState) => {
      emitter(nextAppState)
    }
    AppState.addEventListener('change', listener)
    return () => {
      AppState.removeEventListener('change', listener)
    }
  }, buffers.expanding(1))
}

export default createAppStateChannel
