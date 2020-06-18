import { createSelector, select } from '../../../utils/lang'

const selectDimensionsWindowWidth = select(
  createSelector('dimensions.window.width')
)

export default selectDimensionsWindowWidth
