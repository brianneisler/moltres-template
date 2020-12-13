import { batchDeleteEntity } from '../../../core/sdk'
import { Role } from '../schemas'

const batchDeleteRole = batchDeleteEntity(Role)

export default batchDeleteRole
