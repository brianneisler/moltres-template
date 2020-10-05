import { batchDeleteEntity } from '../../../core/sdk'
import { InternalPhoneNumber } from '../schemas'

const batchDeleteInternalPhoneNumber = batchDeleteEntity(InternalPhoneNumber)

export default batchDeleteInternalPhoneNumber
