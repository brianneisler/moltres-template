import { batchCreateEntity } from 'moltres/core'

import { UserPhoneNumber } from '../schemas'

const batchCreateUserPhoneNumber = batchCreateEntity(UserPhoneNumber)

export default batchCreateUserPhoneNumber
