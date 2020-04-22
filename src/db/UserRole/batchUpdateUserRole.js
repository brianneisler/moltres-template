import { UserRole } from './schemas'
import { batchUpdateEntity } from '../Entity'

const batchUpdateUserRole = batchUpdateEntity(UserRole)

export default batchUpdateUserRole
