import { findDocumentById } from 'moltres/db'
import { UserRole } from '../schemas'

const findUserRoleById = findDocumentById(UserRole)

export default findUserRoleById
