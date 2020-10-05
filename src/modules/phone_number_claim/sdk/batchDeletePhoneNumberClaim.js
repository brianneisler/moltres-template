import { batchDeleteEntity } from '../../../core/sdk'
import { PhoneNumberClaim } from '../schemas'

const batchDeletePhoneNumberClaim = batchDeleteEntity(PhoneNumberClaim)

export default batchDeletePhoneNumberClaim
