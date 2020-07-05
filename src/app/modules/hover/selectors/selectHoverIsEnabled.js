import { createSelector, select } from '../../../../utils/lang'

const selectHoverIsEnabled = select(createSelector('hover.isEnabled'))

export default selectHoverIsEnabled
