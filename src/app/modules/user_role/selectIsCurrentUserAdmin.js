import { createSelector, getProperty, select } from '../../../utils/lang'

import selectCurrentUserRole from './selectCurrentUserRole'

const selectIsCurrentUserAdmin = select(
  createSelector(
    selectCurrentUserRole,
    (currentUserRole) => getProperty('role', currentUserRole) === 'admin'
  )
)

export default selectIsCurrentUserAdmin
