import { UserRole } from './schemas'
import { refDocumentById } from '../../utils/db'

const refUserRoleById = refDocumentById(UserRole)

export default refUserRoleById
