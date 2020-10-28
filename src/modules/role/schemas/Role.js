import { Entity, Id, String } from '../../../core/schemas'
import { RoleValues } from '../constants'
import { values } from '../../../utils/lang'
import UserRole from '../../user_role/schemas/UserRole'

const Role = {
  collectionName: 'Roles',
  idField: 'roleName',
  name: 'Role',
  parentRefIdField: 'userId',
  parentSchema: UserRole,
  schema: Entity.schema.keys({
    userId: Id.schema.required(),
    roleName: String.schema.allow(...values(RoleValues)).required()
  })
}

export default Role
