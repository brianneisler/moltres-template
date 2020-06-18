import { createSelector, select } from '../../../../utils/lang'

const selectRouterLocationPathname = select(
  createSelector('router.location.pathname')
)

export default selectRouterLocationPathname
