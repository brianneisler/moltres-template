import { Action } from '../../../../db/Action'
import { Id, Object, Timestamp } from '../../../../core'

const UserSignedInAction = {
  name: 'auth.UserSignedInAction',
  schema: Action.schema.keys({
    payload: Object.schema
      .keys({
        occuredAt: Timestamp.schema.required(),
        userId: Id.schema.required()
      })
      .required()
  })
}

export default UserSignedInAction
