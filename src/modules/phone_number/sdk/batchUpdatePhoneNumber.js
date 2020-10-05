import { batchUpdateEntity } from '../../../core/sdk'
import { PhoneNumber } from '../schemas'

const batchUpdatePhoneNumber = batchUpdateEntity(PhoneNumber)

export default batchUpdatePhoneNumber
