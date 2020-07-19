import { batchUpdateEntity } from '../Entity'

import { UserPhoneNumber } from './schemas'

const batchUpdateUserPhoneNumber = batchUpdateEntity(UserPhoneNumber)

export default batchUpdateUserPhoneNumber
