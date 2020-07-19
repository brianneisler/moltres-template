import { batchDeleteEntity } from '../Entity'

import { UserRole } from './schemas'

const batchDeleteUserRole = batchDeleteEntity(UserRole)

export default batchDeleteUserRole
