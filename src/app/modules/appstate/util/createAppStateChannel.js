import { AppState } from 'react-native'

import { createExpandingEventListenerChannel } from 'moltres/redux'

const createAppStateChannel = () =>
  createExpandingEventListenerChannel(AppState, 'change')

export default createAppStateChannel
