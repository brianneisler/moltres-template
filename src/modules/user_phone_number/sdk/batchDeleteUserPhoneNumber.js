import { batchDeleteEntity } from '../../../core/sdk'
import { UserPhoneNumber } from '../schemas'

const batchDeleteUserPhoneNumber = batchDeleteEntity(UserPhoneNumber)

export default batchDeleteUserPhoneNumber
