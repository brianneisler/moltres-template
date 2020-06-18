import { createAction } from '../../../../utils/redux'

const uploadUserProfileImage = createAction(
  'UPLOAD_USER_PROFILE_IMAGE',
  (userProfileImage) => ({
    userProfileImage
  })
)

export default uploadUserProfileImage
