import { Entity } from '../../Entity'
import Joi from '@hapi/joi'

const User = {
  collectionName: 'Users',
  name: 'User',
  schema: Entity.keys({
    name: Joi.string(),
    state: Joi.string().valid('disabled', 'pending', 'valid').required(),
    uid: Joi.string()
  })
}

export default User
