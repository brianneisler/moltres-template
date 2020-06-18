import { createSelector, select } from '../../../utils/lang'

const selectCurrentStatus = select(createSelector('status.current'))

export default selectCurrentStatus
