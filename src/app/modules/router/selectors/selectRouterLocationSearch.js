import { createSelector, select } from '../../../../utils/lang'

const selectRouterLocationSearch = select(
  createSelector('router.location.search')
)

export default selectRouterLocationSearch
