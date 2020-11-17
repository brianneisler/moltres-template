import { createSelector, select } from 'moltres/lang'

const selectRouterAction = select(createSelector('router.action'))

export default selectRouterAction
