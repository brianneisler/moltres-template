import { Entity, Id } from 'moltres/core'

const UserPhoneNumber = {
  collectionName: 'UserPhoneNumbers',
  idField: 'phoneNumberId',
  name: 'UserPhoneNumber',
  schema: Entity.schema.keys({
    phoneNumberId: Id.schema.required(),
    userId: Id.schema.required()
  })
}

export default UserPhoneNumber
