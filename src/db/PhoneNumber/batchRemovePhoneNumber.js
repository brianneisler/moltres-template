import { batchRemoveEntity } from '../Entity'

import { PhoneNumber } from './schemas'

const batchRemovePhoneNumber = batchRemoveEntity(PhoneNumber)

export default batchRemovePhoneNumber
