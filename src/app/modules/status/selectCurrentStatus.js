import { createSelector, select } from 'moltres/lang'

const selectCurrentStatus = select(createSelector('status.current'))

export default selectCurrentStatus
