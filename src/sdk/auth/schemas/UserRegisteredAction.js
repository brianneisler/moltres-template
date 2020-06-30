import { Action } from '../../../db/Action/schemas'
import { Id, Object, String } from '../../../core/schemas'

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
