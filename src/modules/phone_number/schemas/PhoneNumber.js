import { Entity, String } from '../../../core/schemas'

const PhoneNumber = {
  collectionName: 'PhoneNumbers',
  indexes: [['hash']],
  name: 'PhoneNumber',
  schema: Entity.schema.keys({
    hash: String.schema.hex().required(),
    phoneNumber: String.schema.required(), // TODO: Replace with phoneNumber()
    type: String.schema.valid('internal', 'unclaimed', 'user').required()
  })
}

export default PhoneNumber
