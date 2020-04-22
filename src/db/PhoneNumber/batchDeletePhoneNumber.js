import { PhoneNumber } from './schemas'
import { batchDeleteEntity } from '../Entity'

const batchDeletePhoneNumber = batchDeleteEntity(PhoneNumber)

export default batchDeletePhoneNumber
