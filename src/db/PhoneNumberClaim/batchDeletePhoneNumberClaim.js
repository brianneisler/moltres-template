import { PhoneNumberClaim } from './schemas'
import { batchDeleteEntity } from '../Entity'

const batchDeletePhoneNumberClaim = batchDeleteEntity(PhoneNumberClaim)

export default batchDeletePhoneNumberClaim
