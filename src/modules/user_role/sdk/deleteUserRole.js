import { deleteEntity } from '../../../core/sdk'
import { UserRole } from '../schemas'

const deleteUserRole = deleteEntity(UserRole)

export default deleteUserRole
