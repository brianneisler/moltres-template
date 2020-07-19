import { batchCreateEntity } from '../Entity'

import { PhoneNumberClaim } from './schemas'

const batchCreatePhoneNumberClaim = batchCreateEntity(PhoneNumberClaim)

export default batchCreatePhoneNumberClaim
