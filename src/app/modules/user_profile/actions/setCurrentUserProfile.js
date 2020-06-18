import { createAction } from '../../../../utils/redux'

const setCurrentUserProfile = createAction(
  'SET_CURRENT_USER_PROFILE',
  (currentUserProfile) => ({
    currentUserProfile
  })
)

export default setCurrentUserProfile
