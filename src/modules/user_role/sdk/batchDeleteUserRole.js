import { batchDeleteEntity } from 'moltres/core'
import { UserRole } from '../schemas'

const batchDeleteUserRole = batchDeleteEntity(UserRole)

export default batchDeleteUserRole
