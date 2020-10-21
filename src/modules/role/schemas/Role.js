import { ADMIN, HIL } from '../../../constants/Role'
import { Entity, Id, String } from '../../../core/schemas'
import UserRole from '../../user_role/schemas/UserRole'

const Role = {
  collectionName: 'Roles',
  idField: 'roleName',
  name: 'Role',
  parentRefIdField: 'userId',
  parentSchema: UserRole,
  schema: Entity.schema.keys({
    userId: Id.schema.required(),
    roleName: String.schema.required()
  })
}

export default Role
