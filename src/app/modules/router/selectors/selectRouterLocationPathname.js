import { createSelector, select } from 'moltres/lang'

const selectRouterLocationPathname = select(
  createSelector('router.location.pathname')
)

export default selectRouterLocationPathname
