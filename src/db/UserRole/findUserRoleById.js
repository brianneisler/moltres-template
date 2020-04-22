import { UserRole } from './schemas'
import { findDocumentById } from '../../utils/db'

const findUserRoleById = findDocumentById(UserRole)

export default findUserRoleById
