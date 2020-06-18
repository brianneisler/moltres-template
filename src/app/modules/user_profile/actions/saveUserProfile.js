import { createAction } from '../../../../utils/redux'

const saveUserProfile = createAction('SAVE_USER_PROFILE', (userProfile) => ({
  userProfile
}))

export default saveUserProfile
