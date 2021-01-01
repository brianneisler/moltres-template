import { eventChannel, expandingBuffer } from '../../../../../utils/redux'

const createWebNavigationCompletedChannel = () => {
  console.log('createWebNavigationCompletedChannel')
  return eventChannel((emitter) => {
    const listener = (data) => {
      console.log('listener - data:', data)
      emitter(data)
    }
    chrome.webNavigation.onCompleted.addListener(listener)
    return () => {
      chrome.webNavigation.onCompleted.removeListener(listener)
    }
  }, expandingBuffer(1))
}

export default createWebNavigationCompletedChannel
