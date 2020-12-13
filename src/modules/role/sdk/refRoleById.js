import { refDocumentById } from '../../../utils/db'
import { Role } from '../schemas'

const refRoleById = refDocumentById(Role)

export default refRoleById
