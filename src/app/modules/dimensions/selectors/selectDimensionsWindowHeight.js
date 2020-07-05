import { createSelector, select } from '../../../../utils/lang'

const selectDimensionsWindowHeight = select(
  createSelector('dimensions.window.height')
)

export default selectDimensionsWindowHeight
