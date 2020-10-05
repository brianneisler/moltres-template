import { batchUpdateEntity } from '../../../core/sdk'
import { User } from '../schemas'

const batchUpdateUser = batchUpdateEntity(User)

export default batchUpdateUser
