import { createSelector, select } from 'moltres/lang'

const selectDimensionsWindowHeight = select(
  createSelector('dimensions.window.height')
)

export default selectDimensionsWindowHeight
