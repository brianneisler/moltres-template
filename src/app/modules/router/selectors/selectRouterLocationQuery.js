import { createSelector, select } from '../../../../utils/lang'

const selectRouterLocationQuery = select(
  createSelector('router.location.query')
)

export default selectRouterLocationQuery
