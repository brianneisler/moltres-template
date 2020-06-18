import { createSelector, select } from '../../../../utils/lang'

const selectRouterLocationState = select(
  createSelector('router.location.state')
)

export default selectRouterLocationState
