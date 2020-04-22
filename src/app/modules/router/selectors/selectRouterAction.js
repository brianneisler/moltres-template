import { createSelector, select } from '../../../../utils/data'

const selectRouterAction = select(createSelector('router.action'))

export default selectRouterAction
