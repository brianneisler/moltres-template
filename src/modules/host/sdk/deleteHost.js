import { deleteEntity } from '../../../core/sdk'
import { Host } from '../schemas'

const deleteHost = deleteEntity(Host)

export default deleteHost
