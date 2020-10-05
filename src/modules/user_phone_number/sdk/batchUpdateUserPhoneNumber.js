import { batchUpdateEntity } from '../../../core/sdk'
import { UserPhoneNumber } from '../schemas'

const batchUpdateUserPhoneNumber = batchUpdateEntity(UserPhoneNumber)

export default batchUpdateUserPhoneNumber
