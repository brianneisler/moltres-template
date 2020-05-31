import { createSelector, select } from '../../../utils/data'

const selectCurrentStatus = select(createSelector('status.current'))

export default selectCurrentStatus
