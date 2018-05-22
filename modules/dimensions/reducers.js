import { merge } from 'ramda'
import { Dimensions } from 'react-native'
import { handleActions } from 'redux-actions'
import { dimensionsChanged } from './actions'

export default handleActions({
  [dimensionsChanged]: (state, { payload }) => merge(state, payload)
}, {
  screen: Dimensions.get('screen'),
  window: Dimensions.get('window')
})
