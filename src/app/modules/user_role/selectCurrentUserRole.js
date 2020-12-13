import { createSelector, select } from 'moltres/lang'

const selectCurrentUserRole = select(
  createSelector('user_role.currentUserRole')
)

export default selectCurrentUserRole
