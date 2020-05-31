import { createAction } from 'redux-actions'

const setCurrentUserRole = createAction('USER_ROLE:SET_CURRENT_USER_ROLE', (currentUserRole) => ({
  currentUserRole
}))

export default setCurrentUserRole
