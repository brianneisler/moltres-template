import { createSelector, select } from 'moltres/lang'

const selectRouterLocationQuery = select(
  createSelector('router.location.query')
)

export default selectRouterLocationQuery
