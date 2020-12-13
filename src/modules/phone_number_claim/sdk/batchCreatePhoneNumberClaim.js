import { batchCreateEntity } from 'moltres/core'

import { PhoneNumberClaim } from '../schemas'

const batchCreatePhoneNumberClaim = batchCreateEntity(PhoneNumberClaim)

export default batchCreatePhoneNumberClaim
