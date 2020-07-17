import { batchRemoveEntity } from '../Entity'

import { UserRole } from './schemas'

const batchRemoveUserRole = batchRemoveEntity(UserRole)

export default batchRemoveUserRole
