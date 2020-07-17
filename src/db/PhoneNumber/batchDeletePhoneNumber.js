import { batchDeleteEntity } from '../Entity'

import { PhoneNumber } from './schemas'

const batchDeletePhoneNumber = batchDeleteEntity(PhoneNumber)

export default batchDeletePhoneNumber
