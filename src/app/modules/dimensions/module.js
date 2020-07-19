import { Dimensions } from 'react-native'

import { merge } from '../../../utils/lang'
import { fork, handleActions } from '../../../utils/redux'

import { DimensionsChangedAction } from './schemas'
import { monitorDimensions } from './util'

const module = {
  reducer: handleActions(
    {
      [DimensionsChangedAction.type]: (state, { payload }) =>
        merge(state, payload)
    },
    {
      screen: Dimensions.get('screen'),
      window: Dimensions.get('window')
    }
  ),
  run: function* run() {
    yield fork(monitorDimensions)
  }
}

export default module
