import { batchDeleteEntity } from '../Entity'

import { PhoneNumberClaim } from './schemas'

const batchDeletePhoneNumberClaim = batchDeleteEntity(PhoneNumberClaim)

export default batchDeletePhoneNumberClaim
