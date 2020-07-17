import { batchCreateEntity } from '../Entity'

import { UserRole } from './schemas'

const batchCreateUserRole = batchCreateEntity(UserRole)

export default batchCreateUserRole
