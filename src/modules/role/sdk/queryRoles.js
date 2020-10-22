import { queryEntities } from '../../../core/sdk'
import { Role } from '../schemas'

const queryRoles = queryEntities(Role)

export default queryRoles
