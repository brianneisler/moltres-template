import { Id, Object, String } from '../../../core/schemas'
import { Action } from '../../../db/Action/schemas'

const UserRegisteredAction = {
  schema: Action.schema.keys({
    payload: Object.schema.keys({
      data: Object.schema,
      method: String.schema.required(),
      userId: Id.schema.required()
    })
  }),
  type: 'USER_REGISTERED'
}

export default UserRegisteredAction
