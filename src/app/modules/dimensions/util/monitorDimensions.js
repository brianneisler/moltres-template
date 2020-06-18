import { call, handleChannel, put, select } from '../../../../utils/redux'
import { dimensionsChanged } from '../actions'
import { selectContext } from '../../../../core'
import createDimensionsChannel from './createDimensionsChannel'

function* monitorDimensions() {
  const channel = createDimensionsChannel()
  yield call(handleChannel, channel, function* (event) {
    const context = yield select(selectContext)
    yield put(dimensionsChanged(context, event))
  })
}

export default monitorDimensions
