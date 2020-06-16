import { createSelector, select } from '../../../utils/data'

const selectCurrentActionSheet = select(
  createSelector('action_sheet.currentActionSheet')
)

export default selectCurrentActionSheet
