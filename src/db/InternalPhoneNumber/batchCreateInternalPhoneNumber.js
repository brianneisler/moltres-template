import { InternalPhoneNumber } from './schemas'
import { batchCreateEntity } from '../Entity'

const batchCreateInternalPhoneNumber = batchCreateEntity(InternalPhoneNumber)

export default batchCreateInternalPhoneNumber
