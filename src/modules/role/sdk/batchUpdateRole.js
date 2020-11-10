import { batchUpdateEntity } from '../../../core/sdk'
import { Role } from '../schemas'

const batchUpdateRole = batchUpdateEntity(Role)

export default batchUpdateRole
