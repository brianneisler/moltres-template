import { batchUpdateEntity } from '../../../core/sdk'
import { Host } from '../schemas'

const batchUpdateHost = batchUpdateEntity(Host)

export default batchUpdateHost
