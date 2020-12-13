import { Entity, Id } from 'moltres/core'

const UserRole = {
  collectionName: 'UserRoles',
  idField: 'userId',
  name: 'UserRole',
  schema: Entity.schema.keys({
    userId: Id.schema.required()
  })
}

export default UserRole
