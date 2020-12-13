import { batchUpdateEntity } from 'moltres/core'

import { UserPhoneNumber } from '../schemas'

const batchUpdateUserPhoneNumber = batchUpdateEntity(UserPhoneNumber)

export default batchUpdateUserPhoneNumber
