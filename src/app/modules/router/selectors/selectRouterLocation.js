import { createSelector, select } from 'moltres/lang'

const selectRouterLocation = select(createSelector('router.location'))

export default selectRouterLocation
