import { createSelector, select } from '../../../../utils/data'

const selectRouterLocationPathname = select(
  createSelector('router.location.pathname')
)

export default selectRouterLocationPathname
