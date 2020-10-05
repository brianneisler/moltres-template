import { Entity, Id } from '../../../core/schemas'

const UserPreferences = {
  collectionName: 'UserPreferences',
  idField: 'userId',
  name: 'UserPreferences',
  schema: Entity.schema.keys({
    userId: Id.schema.required()
  })
}

export default UserPreferences
