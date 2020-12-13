import { batchDeleteEntity } from 'moltres/core'

import { UserPhoneNumber } from '../schemas'

const batchDeleteUserPhoneNumber = batchDeleteEntity(UserPhoneNumber)

export default batchDeleteUserPhoneNumber
