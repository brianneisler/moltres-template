import { Action } from '../../../db/Action/schemas'
import { id } from '../../../utils/schema'
import Joi from '@hapi/joi'

const UserRegisteredAction = {
  schema: Action.schema.keys({
    payload: Joi.object().keys({
      data: Joi.object(),
      method: Joi.string().required(),
      userId: id().required()
    })
  }),
  type: 'USER_REGISTERED'
}

export default UserRegisteredAction
