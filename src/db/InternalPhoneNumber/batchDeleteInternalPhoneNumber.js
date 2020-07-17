import { batchDeleteEntity } from '../Entity'

import { InternalPhoneNumber } from './schemas'

const batchDeleteInternalPhoneNumber = batchDeleteEntity(InternalPhoneNumber)

export default batchDeleteInternalPhoneNumber
