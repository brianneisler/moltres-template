import { batchCreateEntity } from '../../../core/sdk'
import { PhoneNumberClaim } from '../schemas'

const batchCreatePhoneNumberClaim = batchCreateEntity(PhoneNumberClaim)

export default batchCreatePhoneNumberClaim
