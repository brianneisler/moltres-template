import { PhoneNumber } from './schemas'
import { batchUpdateEntity } from '../Entity'

const batchUpdatePhoneNumber = batchUpdateEntity(PhoneNumber)

export default batchUpdatePhoneNumber
