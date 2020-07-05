import { AppState } from 'react-native'
import { createExpandingEventListenerChannel } from '../../../../utils/redux'

const createAppStateChannel = () =>
  createExpandingEventListenerChannel(AppState, 'change')

export default createAppStateChannel
