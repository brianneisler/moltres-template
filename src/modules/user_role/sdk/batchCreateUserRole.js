import { batchCreateEntity } from 'moltres/core'
import { UserRole } from '../schemas'

const batchCreateUserRole = batchCreateEntity(UserRole)

export default batchCreateUserRole
