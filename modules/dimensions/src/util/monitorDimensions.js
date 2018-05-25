import { call, put, watchChannel } from 'moltres'
import { dimensionsChanged } from './actions'
import createDimensionsChannel from './createDimensionsChannel'

function* monitorDimensions() {
  const channel = createDimensionsChannel()
  return yield call(watchChannel, channel, function* (event) {
    yield put(dimensionsChanged(event))
  })
}

export defautl monitorDimensions
