import { batchUpdateEntity } from 'moltres/core'
import { UserRole } from '../schemas'

const batchUpdateUserRole = batchUpdateEntity(UserRole)

export default batchUpdateUserRole
