import { PhoneNumberClaim } from './schemas'
import { batchCreateEntity } from '../Entity'

const batchCreatePhoneNumberClaim = batchCreateEntity(PhoneNumberClaim)

export default batchCreatePhoneNumberClaim
