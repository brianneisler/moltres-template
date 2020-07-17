import { selectContext } from '../../../../core'
import { call, handleChannel, put, select } from '../../../../utils/redux'
import { dimensionsChangedAction } from '../actions'

import createDimensionsChannel from './createDimensionsChannel'

function* monitorDimensions() {
  const channel = createDimensionsChannel()
  yield call(handleChannel, channel, function* (event) {
    const context = yield select(selectContext)
    yield put(dimensionsChangedAction(context, event))
  })
}

export default monitorDimensions
