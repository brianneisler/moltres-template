import { batchUpdateEntity } from '../../../core/sdk'
import { UserRole } from '../schemas'

const batchUpdateUserRole = batchUpdateEntity(UserRole)

export default batchUpdateUserRole
