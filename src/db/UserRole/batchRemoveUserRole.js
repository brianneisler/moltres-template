import { UserRole } from './schemas'
import { batchRemoveEntity } from '../Entity'

const batchRemoveUserRole = batchRemoveEntity(UserRole)

export default batchRemoveUserRole
