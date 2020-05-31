import { createAction } from 'redux-actions'

const saveUserProfile = createAction('SAVE_USER_PROFILE', (userProfile) => ({
  userProfile
}))

export default saveUserProfile
