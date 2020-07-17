import { batchUpdateEntity } from '../Entity'

import { UserRole } from './schemas'

const batchUpdateUserRole = batchUpdateEntity(UserRole)

export default batchUpdateUserRole
