import { Entity, Id, String } from '../../../core/schemas'
import { values } from '../../../utils/lang'
import UserRole from '../../user_role/schemas/UserRole'
import { RoleValues } from '../constants'

const Role = {
  collectionName: 'Roles',
  idField: 'roleName',
  name: 'Role',
  parentRefIdField: 'userId',
  parentSchema: UserRole,
  schema: Entity.schema.keys({
    roleName: String.schema.allow(...values(RoleValues)).required(),
    userId: Id.schema.required()
  })
}

export default Role
