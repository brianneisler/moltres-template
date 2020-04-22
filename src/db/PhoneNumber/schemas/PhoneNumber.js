import { Entity } from '../../Entity'
import Joi from '@hapi/joi'

const PhoneNumber = {
  collectionName: 'PhoneNumbers',
  indexes: [['hash']],
  name: 'PhoneNumber',
  schema: Entity.keys({
    hash: Joi.string().hex().required(),
    phoneNumber: Joi.string().required(), // TODO: Replace with phoneNumber()
    type: Joi.string().valid('internal', 'unclaimed', 'user').required()
  })
}

export default PhoneNumber
