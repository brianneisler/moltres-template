import { batchCreateEntity } from '../../../core/sdk'
import { InternalPhoneNumber } from '../schemas'

const batchCreateInternalPhoneNumber = batchCreateEntity(InternalPhoneNumber)

export default batchCreateInternalPhoneNumber
