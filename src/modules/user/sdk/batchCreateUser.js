import { batchCreateEntity } from '../../../core/sdk'
import { User } from '../schemas'

const batchCreateUser = batchCreateEntity(User)

export default batchCreateUser
