import { batchRemoveEntity } from 'moltres/core'
import { UserRole } from '../schemas'

const batchRemoveUserRole = batchRemoveEntity(UserRole)

export default batchRemoveUserRole
