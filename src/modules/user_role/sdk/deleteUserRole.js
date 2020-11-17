import { deleteEntity } from 'moltres/core'
import { UserRole } from '../schemas'

const deleteUserRole = deleteEntity(UserRole)

export default deleteUserRole
