import { UserRole } from './schemas'
import { batchCreateEntity } from '../Entity'

const batchCreateUserRole = batchCreateEntity(UserRole)

export default batchCreateUserRole
