import { batchDeleteEntity } from '../Entity'

import { Host } from './schemas'

const batchDeleteHost = batchDeleteEntity(Host)

export default batchDeleteHost
