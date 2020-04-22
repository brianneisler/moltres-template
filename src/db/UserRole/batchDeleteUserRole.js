import { UserRole } from './schemas'
import { batchDeleteEntity } from '../Entity'

const batchDeleteUserRole = batchDeleteEntity(UserRole)

export default batchDeleteUserRole
