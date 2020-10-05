import { batchRemoveEntity } from '../../../core/sdk'
import { User } from '../schemas'

const batchRemoveUser = batchRemoveEntity(User)

export default batchRemoveUser
