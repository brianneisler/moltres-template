import { createSelector, select } from '../../../../utils/data'

const selectRouterLocation = select(createSelector('router.location'))

export default selectRouterLocation
