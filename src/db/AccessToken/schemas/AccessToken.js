import { Entity } from '../../Entity'
import { id } from '../../../utils/schema'
import Joi from '@hapi/joi'

const AccessToken = {
  collectionName: 'AccessTokens',
  name: 'AccessToken',
  schema: Entity.keys({
    token: Joi.string().guid({
      version: 'uuidv4'
    }),
    userId: id().required(),
    valid: Joi.boolean().required()
  })
}

export default AccessToken
