import { call, handleChannel, put } from '../../../../utils/redux'
import { setNetworkInformation } from '../actions'
import createNetworkInformationChannel from './createNetworkInformationChannel'

function* monitorNetworkInformationChannel(context) {
  const channel = createNetworkInformationChannel(context)
  yield call(handleChannel, channel, function* (information) {
    yield put(setNetworkInformation({ information }))
  })
}

export default monitorNetworkInformationChannel
