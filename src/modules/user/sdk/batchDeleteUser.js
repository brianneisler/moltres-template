import { batchDeleteEntity } from '../../../core/sdk'
import { User } from '../schemas'

const batchDeleteUser = batchDeleteEntity(User)

export default batchDeleteUser
