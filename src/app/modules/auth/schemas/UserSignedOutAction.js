import { Action } from '../../../../db/Action'
import { Id, Object, Timestamp } from '../../../../core'

const UserSignedOutAction = {
  name: 'auth.UserSignedOutAction',
  schema: Action.schema.keys({
    payload: Object.schema
      .keys({
        occuredAt: Timestamp.schema.required(),
        userId: Id.schema.required()
      })
      .required()
  })
}

export default UserSignedOutAction
