import { batchRemoveEntity } from '../../../core/sdk'
import { Host } from '../schemas'

const batchRemoveHost = batchRemoveEntity(Host)

export default batchRemoveHost
