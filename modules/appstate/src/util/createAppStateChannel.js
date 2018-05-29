import { eventChannel } from 'moltres'
import { AppState } from 'react-native'

const createAppStateChannel = () => {
  return eventChannel((emitter) => {
    const listener = (nextAppState) => {
      emitter(nextAppState)
    }
    AppState.addEventListener('change', listener)
    return () => {
      AppState.removeEventListener('change', listener)
    }
  })
}

export default createAppStateChannel
