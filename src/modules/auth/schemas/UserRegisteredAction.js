import { Action, Id, Object, String } from '../../../core/schemas'

const UserRegisteredAction = {
  name: 'auth.UserRegisteredAction',
  schema: Action.schema.keys({
    payload: Object.schema.keys({
      data: Object.schema,
      method: String.schema.required(),
      userId: Id.schema.required()
    })
  })
}

export default UserRegisteredAction
