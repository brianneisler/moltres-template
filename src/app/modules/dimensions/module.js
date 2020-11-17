import { Dimensions } from 'react-native'

import { merge } from 'moltres/lang'
import { fork, handleActions } from 'moltres/redux'

import { DimensionsChangedAction } from './schemas'
import { monitorDimensions } from './util'

const mod = () => ({
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
  *run() {
    yield fork(monitorDimensions)
  }
})

export default mod
