import { UserRole } from './schemas'
import { deleteEntity } from '../Entity'

const deleteUserRole = deleteEntity(UserRole)

export default deleteUserRole
