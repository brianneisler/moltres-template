import { createSelector, select } from '../../../../utils/lang'

const selectRouterLocation = select(createSelector('router.location'))

export default selectRouterLocation
