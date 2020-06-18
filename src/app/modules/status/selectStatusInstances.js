import { createSelector, select } from '../../../utils/lang'

const selectStatusInstances = select(createSelector('status.instances'))

export default selectStatusInstances
