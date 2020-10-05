import { batchDeleteEntity } from '../../../core/sdk'
import { UserRole } from '../schemas'

const batchDeleteUserRole = batchDeleteEntity(UserRole)

export default batchDeleteUserRole
