import { Id, String } from '../../../core/schemas'
import { Entity } from '../../Entity'

const UserRole = {
  collectionName: 'UserRoles',
  idField: 'userId',
  name: 'UserRole',
  schema: Entity.schema.keys({
    role: String.schema.valid('admin').required(),
    userId: Id.schema.required()
  })
}

export default UserRole
