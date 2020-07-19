import { batchUpdateEntity } from '../Entity'

import { PhoneNumber } from './schemas'

const batchUpdatePhoneNumber = batchUpdateEntity(PhoneNumber)

export default batchUpdatePhoneNumber
