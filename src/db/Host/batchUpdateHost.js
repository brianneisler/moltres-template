import { batchUpdateEntity } from '../Entity'

import { Host } from './schemas'

const batchUpdateHost = batchUpdateEntity(Host)

export default batchUpdateHost
