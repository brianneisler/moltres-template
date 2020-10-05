import { batchDeleteEntity } from '../../../core/sdk'
import { Host } from '../schemas'

const batchDeleteHost = batchDeleteEntity(Host)

export default batchDeleteHost
