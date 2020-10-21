import { Entity, Id } from '../../../core/schemas'

const UserRole = {
  collectionName: 'UserRoles',
  idField: 'userId',
  name: 'UserRole',
  schema: Entity.schema.keys({
    userId: Id.schema.required()
  })
}

export default UserRole
