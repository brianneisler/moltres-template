import { batchRemoveEntity } from '../../../core/sdk'
import { Role } from '../schemas'

const batchRemoveRole = batchRemoveEntity(Role)

export default batchRemoveRole
