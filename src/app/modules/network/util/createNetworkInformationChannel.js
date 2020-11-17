import { eventChannel, expandingBuffer } from 'moltres/redux'
import { getNetworkInformation } from 'moltres/web'

const createNetworkInformationChannel = (context) => {
  return eventChannel((emitter) => {
    const listener = (nextNetworkInformation) => {
      emitter(nextNetworkInformation)
    }
    getNetworkInformation(context).on('change', listener)
    return () => {
      getNetworkInformation(context).off('change', listener)
    }
  }, expandingBuffer(1))
}

export default createNetworkInformationChannel
