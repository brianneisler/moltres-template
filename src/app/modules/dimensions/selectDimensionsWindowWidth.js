import { createSelector, select } from '../../../utils/data'

const selectDimensionsWindowWidth = select(
  createSelector('dimensions.window.width')
)

export default selectDimensionsWindowWidth
