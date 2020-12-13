import { createSelector, select } from 'moltres/lang'

const selectStatusInstances = select(createSelector('status.instances'))

export default selectStatusInstances
