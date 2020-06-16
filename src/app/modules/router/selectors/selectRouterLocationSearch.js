import { createSelector, select } from '../../../../utils/data'

const selectRouterLocationSearch = select(
  createSelector('router.location.search')
)

export default selectRouterLocationSearch
