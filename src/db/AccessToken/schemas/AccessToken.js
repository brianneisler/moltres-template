import { Boolean, Id, String } from '../../../core/schemas'
import { Entity } from '../../Entity'

const AccessToken = {
  collectionName: 'AccessTokens',
  name: 'AccessToken',
  schema: Entity.keys({
    token: String.schema.guid({
      version: 'uuidv4'
    }),
    userId: Id.schema.required(),
    valid: Boolean.schema.required()
  })
}

export default AccessToken
