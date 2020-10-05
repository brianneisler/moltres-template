import { batchRemoveEntity } from '../../../core/sdk'
import { UserRole } from '../schemas'

const batchRemoveUserRole = batchRemoveEntity(UserRole)

export default batchRemoveUserRole
