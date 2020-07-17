import { deleteEntity } from '../Entity'

import { UserRole } from './schemas'

const deleteUserRole = deleteEntity(UserRole)

export default deleteUserRole
