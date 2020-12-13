import { Action, Object } from 'moltres/core'
import { UserProfile } from '../../../../modules/user_profile'

const SetCurrentUserProfileAction = {
  name: 'user_profile.SetCurrentUserProfileAction',
  schema: Action.schema.keys({
    payload: Object.schema
      .keys({
        currentUserProfile: UserProfile.schema.allow(null).required()
      })
      .required()
  })
}

export default SetCurrentUserProfileAction
