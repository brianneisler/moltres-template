import { createAction } from '../../../../utils/redux'

const setCurrentUserRole = createAction(
  'USER_ROLE:SET_CURRENT_USER_ROLE',
  (currentUserRole) => ({
    currentUserRole
  })
)

export default setCurrentUserRole
