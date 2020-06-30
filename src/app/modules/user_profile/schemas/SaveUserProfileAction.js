import { Action, Object } from '../../../../core'
import { UserProfile } from '../../../../db/UserProfile/schemas'

const SaveUserProfileAction = {
  name: 'user_profile.SaveUserProfileAction',
  schema: Action.schema.keys({
    payload: Object.schema
      .keys({
        userProfile: UserProfile.schema.required()
      })
      .required()
  })
}

export default SaveUserProfileAction
