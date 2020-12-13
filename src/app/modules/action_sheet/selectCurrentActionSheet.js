import { createSelector, select } from 'moltres/lang'

const selectCurrentActionSheet = select(
  createSelector('action_sheet.currentActionSheet')
)

export default selectCurrentActionSheet
