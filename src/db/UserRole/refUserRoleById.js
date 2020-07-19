import { refDocumentById } from '../../utils/db'

import { UserRole } from './schemas'

const refUserRoleById = refDocumentById(UserRole)

export default refUserRoleById
