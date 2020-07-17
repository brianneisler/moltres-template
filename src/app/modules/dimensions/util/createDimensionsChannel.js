import { Dimensions } from 'react-native'
import { createSlidingEventListenerChannel } from '../../../../utils/redux'

const createDimensionsChannel = () =>
  createSlidingEventListenerChannel(Dimensions, 'change')

export default createDimensionsChannel
