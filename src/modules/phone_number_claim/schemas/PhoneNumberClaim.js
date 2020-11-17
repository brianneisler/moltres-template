import { Entity, Id } from 'moltres/core'

const PhoneNumberClaim = {
  collectionName: 'PhoneNumberClaims',
  indexes: [['phoneNumberId']],
  name: 'PhoneNumberClaim',
  schema: Entity.schema.keys({
    phoneNumberId: Id.schema.required(),
    userId: Id.schema.required()
  })
}

export default PhoneNumberClaim
