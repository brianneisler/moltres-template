import { createSelector, select } from 'moltres/lang'

const selectHoverIsEnabled = select(createSelector('hover.isEnabled'))

export default selectHoverIsEnabled
