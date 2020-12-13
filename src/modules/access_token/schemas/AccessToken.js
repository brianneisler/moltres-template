import { Boolean, Entity, Id, String } from 'moltres/core'

const AccessToken = {
  collectionName: 'AccessTokens',
  name: 'AccessToken',
  schema: Entity.schema.keys({
    token: String.schema.guid({
      version: 'uuidv4'
    }),
    userId: Id.schema.required(),
    valid: Boolean.schema.required()
  })
}

export default AccessToken
