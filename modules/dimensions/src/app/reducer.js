import { handleActions } from 'moltres'
import { merge } from 'moltres-utils'
import { Dimensions } from 'react-native'
import { dimensionsChanged } from '../actions'

const reducer = handleActions(
  {
    [dimensionsChanged]: (state, { payload }) => merge(state, payload)
  },
  {
    screen: Dimensions.get('screen'),
    window: Dimensions.get('window')
  }
)

export default reducer
