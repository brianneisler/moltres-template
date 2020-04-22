import { InternalPhoneNumber } from './schemas'
import { batchDeleteEntity } from '../Entity'

const batchDeleteInternalPhoneNumber = batchDeleteEntity(InternalPhoneNumber)

export default batchDeleteInternalPhoneNumber
