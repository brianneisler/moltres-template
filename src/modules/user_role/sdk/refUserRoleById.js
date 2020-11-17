import { refDocumentById } from 'moltres/db'
import { UserRole } from '../schemas'

const refUserRoleById = refDocumentById(UserRole)

export default refUserRoleById
