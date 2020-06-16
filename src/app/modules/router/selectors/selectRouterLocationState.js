import { createSelector, select } from '../../../../utils/data'

const selectRouterLocationState = select(
  createSelector('router.location.state')
)

export default selectRouterLocationState
