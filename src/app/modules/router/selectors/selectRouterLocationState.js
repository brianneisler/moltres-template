import { createSelector, select } from 'moltres/lang'

const selectRouterLocationState = select(
  createSelector('router.location.state')
)

export default selectRouterLocationState
