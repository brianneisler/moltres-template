import { batchDeleteEntity } from '../Entity'

import { UserPhoneNumber } from './schemas'

const batchDeleteUserPhoneNumber = batchDeleteEntity(UserPhoneNumber)

export default batchDeleteUserPhoneNumber
