import { batchCreateEntity } from '../../../core/sdk'
import { Role } from '../schemas'

const batchCreateRole = batchCreateEntity(Role)

export default batchCreateRole
