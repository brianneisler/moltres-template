import { batchDeleteEntity } from '../../../core/sdk'
import { PhoneNumber } from '../schemas'

const batchDeletePhoneNumber = batchDeleteEntity(PhoneNumber)

export default batchDeletePhoneNumber
