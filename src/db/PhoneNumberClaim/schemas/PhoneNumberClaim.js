import { Entity } from '../../Entity'
import { id } from '../../../utils/schema'

const PhoneNumberClaim = {
  collectionName: 'PhoneNumberClaims',
  indexes: [['phoneNumberId']],
  name: 'PhoneNumberClaim',
  schema: Entity.keys({
    phoneNumberId: id().required(),
    userId: id().required()
  })
}

export default PhoneNumberClaim
