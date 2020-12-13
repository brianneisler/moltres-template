import { batchCreateEntity } from 'moltres/core'
import { InternalPhoneNumber } from '../schemas'

const batchCreateInternalPhoneNumber = batchCreateEntity(InternalPhoneNumber)

export default batchCreateInternalPhoneNumber
