import { Action, Object } from 'moltres/core'
import { UserProfile } from '../../../../modules/user_profile'

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
