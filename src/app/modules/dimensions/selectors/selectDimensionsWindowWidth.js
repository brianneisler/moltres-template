import { createSelector, select } from 'moltres/lang'

const selectDimensionsWindowWidth = select(
  createSelector('dimensions.window.width')
)

export default selectDimensionsWindowWidth
