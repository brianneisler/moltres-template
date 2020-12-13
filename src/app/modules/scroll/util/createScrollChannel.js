import { createSlidingEventListenerChannel } from 'moltres/redux'

const createScrollChannel = (target) =>
  createSlidingEventListenerChannel(target, 'scroll')

export default createScrollChannel
