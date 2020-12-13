import { batchUpdateEntity } from 'moltres/core'
import { Host } from '../schemas'

const batchUpdateHost = batchUpdateEntity(Host)

export default batchUpdateHost
