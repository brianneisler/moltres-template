import { findDocumentById } from '../../../utils/db'
import { UserRole } from '../schemas'

const findUserRoleById = findDocumentById(UserRole)

export default findUserRoleById
