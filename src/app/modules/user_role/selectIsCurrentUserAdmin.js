import { createSelector, getProperty, select } from 'moltres/lang'

import selectCurrentUserRole from './selectCurrentUserRole'

const selectIsCurrentUserAdmin = select(
  createSelector(
    selectCurrentUserRole,
    (currentUserRole) => getProperty('role', currentUserRole) === 'admin'
  )
)

export default selectIsCurrentUserAdmin
