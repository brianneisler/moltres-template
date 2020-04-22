import { Entity } from '../../Entity'
import Joi from '@hapi/joi'

const Error = {
  collectionName: 'Errors',
  name: 'Error',
  schema: Entity.keys({
    code: Joi.string().allow(null).required(),
    message: Joi.string().required(),
    source: Joi.string().required(),
    stack: Joi.string().required()
  })
}

export default Error
