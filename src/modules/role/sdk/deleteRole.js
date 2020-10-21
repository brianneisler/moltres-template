import { deleteEntity } from '../../../core/sdk'
import { Role } from '../schemas'

const deleteRole = deleteEntity(Role)

export default deleteRole
