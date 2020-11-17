import { batchDeleteEntity } from 'moltres/core'
import { PhoneNumber } from '../schemas'

const batchDeletePhoneNumber = batchDeleteEntity(PhoneNumber)

export default batchDeletePhoneNumber
