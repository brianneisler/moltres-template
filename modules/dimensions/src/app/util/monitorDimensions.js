import { put, watchChannel } from 'moltres'
import { dimensionsChanged } from '../../actions'
import createDimensionsChannel from './createDimensionsChannel'

function* monitorDimensions() {
  const channel = createDimensionsChannel()
  yield watchChannel(channel, function*(event) {
    yield put(dimensionsChanged(event))
  })
}

export default monitorDimensions
