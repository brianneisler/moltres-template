import { batchUpdateEntity } from 'moltres/core'
import { PhoneNumber } from '../schemas'

const batchUpdatePhoneNumber = batchUpdateEntity(PhoneNumber)

export default batchUpdatePhoneNumber
