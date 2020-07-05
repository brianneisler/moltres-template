import { createSlidingEventListenerChannel } from '../../../../utils/redux'

const createScrollChannel = (target) =>
  createSlidingEventListenerChannel(target, 'scroll')

export default createScrollChannel
