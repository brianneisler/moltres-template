import { Entity } from '../../Entity'
import { Id } from '../../../core/schemas

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
