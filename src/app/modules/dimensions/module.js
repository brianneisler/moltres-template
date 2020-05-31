import { Dimensions } from 'react-native'
import { DimensionsChangedAction } from './schemas'
import { fork, handleActions } from '../../../utils/lang'
import { merge } from '../../../utils/data'
import { monitorDimensions } from './util'

const module = {
  reducer: handleActions(
    {
      [DimensionsChangedAction.type]: (state, { payload }) => merge(state, payload)
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
