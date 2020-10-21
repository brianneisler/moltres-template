import { findDocumentById } from '../../../utils/db'
import { Role } from '../schemas'

const findRoleById = findDocumentById(Role)

export default findRoleById
