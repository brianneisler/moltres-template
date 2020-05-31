import { createSelector, select } from '../../../utils/data'

const selectStatusInstances = select(createSelector('status.instances'))

export default selectStatusInstances
