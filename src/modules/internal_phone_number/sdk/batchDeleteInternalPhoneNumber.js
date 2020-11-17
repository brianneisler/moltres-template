import { batchDeleteEntity } from 'moltres/core'
import { InternalPhoneNumber } from '../schemas'

const batchDeleteInternalPhoneNumber = batchDeleteEntity(InternalPhoneNumber)

export default batchDeleteInternalPhoneNumber
