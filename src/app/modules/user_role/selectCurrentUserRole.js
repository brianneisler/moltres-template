import { createSelector, select } from '../../../utils/lang'

const selectCurrentUserRole = select(
  createSelector('user_role.currentUserRole')
)

export default selectCurrentUserRole
