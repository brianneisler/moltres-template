import { Entity, Id } from 'moltres/core'

const InternalPhoneNumber = {
  collectionName: 'InternalPhoneNumbers',
  idField: 'phoneNumberId',
  name: 'InternalPhoneNumber',
  schema: Entity.schema.keys({
    phoneNumberId: Id.schema.required()
  })
}

export default InternalPhoneNumber
