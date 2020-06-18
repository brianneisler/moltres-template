import { createSelector, select } from '../../../utils/lang'

const selectCurrentActionSheet = select(
  createSelector('action_sheet.currentActionSheet')
)

export default selectCurrentActionSheet
