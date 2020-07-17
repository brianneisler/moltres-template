import { eventChannel, expandingBuffer } from '../../../../utils/redux'
import { getNetworkInformation } from '../../../../utils/web'

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
