import { Action, Object } from 'moltres/core'

const UploadUserProfileImageAction = {
  name: 'user_profile_image.UploadUserProfileImageAction',
  schema: Action.schema.keys({
    payload: Object.schema
      .keys({
        // TODO BRN: Make this Schema more specific
        userProfileImage: Object.schema.required()
      })
      .required()
  })
}

export default UploadUserProfileImageAction
