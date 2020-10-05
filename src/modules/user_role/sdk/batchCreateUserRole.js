import { batchCreateEntity } from '../../../core/sdk'
import { UserRole } from '../schemas'

const batchCreateUserRole = batchCreateEntity(UserRole)

export default batchCreateUserRole
