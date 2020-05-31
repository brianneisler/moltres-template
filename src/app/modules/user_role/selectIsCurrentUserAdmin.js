import { createSelector, getProp, select } from '../../../utils/data'
import selectCurrentUserRole from './selectCurrentUserRole'

const selectIsCurrentUserAdmin = select(
  createSelector(
    selectCurrentUserRole,
    (currentUserRole) => getProp('role', currentUserRole) === 'admin'
  )
)

export default selectIsCurrentUserAdmin
