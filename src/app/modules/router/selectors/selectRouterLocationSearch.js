import { createSelector, select } from 'moltres/lang'

const selectRouterLocationSearch = select(
  createSelector('router.location.search')
)

export default selectRouterLocationSearch
