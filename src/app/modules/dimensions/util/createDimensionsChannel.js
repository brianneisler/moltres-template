import { Dimensions } from 'react-native'

import { createSlidingEventListenerChannel } from 'moltres/redux'

const createDimensionsChannel = () =>
  createSlidingEventListenerChannel(Dimensions, 'change')

export default createDimensionsChannel
