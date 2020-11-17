import { Entity, Id } from 'moltres/core'

const UserPreferences = {
  collectionName: 'UserPreferences',
  idField: 'userId',
  name: 'UserPreferences',
  schema: Entity.schema.keys({
    userId: Id.schema.required()
  })
}

export default UserPreferences
