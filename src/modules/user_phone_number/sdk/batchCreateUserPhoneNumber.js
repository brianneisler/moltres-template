import { batchCreateEntity } from '../../../core/sdk'
import { UserPhoneNumber } from '../schemas'

const batchCreateUserPhoneNumber = batchCreateEntity(UserPhoneNumber)

export default batchCreateUserPhoneNumber
