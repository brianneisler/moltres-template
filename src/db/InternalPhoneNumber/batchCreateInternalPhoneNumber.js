import { batchCreateEntity } from '../Entity'

import { InternalPhoneNumber } from './schemas'

const batchCreateInternalPhoneNumber = batchCreateEntity(InternalPhoneNumber)

export default batchCreateInternalPhoneNumber
