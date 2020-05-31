import { createSelector, select } from '../../../utils/data'

const selectCurrentUserRole = select(createSelector('user_role.currentUserRole'))

export default selectCurrentUserRole
