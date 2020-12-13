import { createAction } from 'moltres/redux'

const setCurrentUserRole = createAction(
  'USER_ROLE:SET_CURRENT_USER_ROLE',
  (currentUserRole) => ({
    currentUserRole
  })
)

export default setCurrentUserRole
