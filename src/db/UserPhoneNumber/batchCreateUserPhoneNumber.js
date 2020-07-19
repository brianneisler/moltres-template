import { batchCreateEntity } from '../Entity'

import { UserPhoneNumber } from './schemas'

const batchCreateUserPhoneNumber = batchCreateEntity(UserPhoneNumber)

export default batchCreateUserPhoneNumber
