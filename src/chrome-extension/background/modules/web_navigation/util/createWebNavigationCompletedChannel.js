import { eventChannel, expandingBuffer } from '../../../../../utils/redux'

const createWebNavigationCompletedChannel = () => {
  return eventChannel((emitter) => {
    const listener = (data) => {
      emitter(data)
    }
    chrome.webNavigation.onCompleted.addListener(listener)
    return () => {
      chrome.webNavigation.onCompleted.removeListener(listener)
    }
  }, expandingBuffer(1))
}

export default createWebNavigationCompletedChannel
