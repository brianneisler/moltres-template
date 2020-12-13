import { batchDeleteEntity } from 'moltres/core'

import { PhoneNumberClaim } from '../schemas'

const batchDeletePhoneNumberClaim = batchDeleteEntity(PhoneNumberClaim)

export default batchDeletePhoneNumberClaim
