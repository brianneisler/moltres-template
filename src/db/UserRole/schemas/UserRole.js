import { Entity } from '../../Entity'
import { Id, String } from '../../../core/schemas'

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
