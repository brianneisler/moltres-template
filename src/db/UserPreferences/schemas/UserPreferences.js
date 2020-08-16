import { Id } from '../../../core/schemas'
import { Entity } from '../../Entity'

const UserPreferences = {
  collectionName: 'UserPreferences',
  idField: 'userId',
  name: 'UserPreferences',
  schema: Entity.schema.keys({
    userId: Id.schema.required()
  })
}

export default UserPreferences
