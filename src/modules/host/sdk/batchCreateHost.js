import { batchCreateEntity } from '../../../core/sdk'
import { Host } from '../schemas'

const batchCreateHost = batchCreateEntity(Host)

export default batchCreateHost
