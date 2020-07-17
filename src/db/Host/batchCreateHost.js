import { batchCreateEntity } from '../Entity'

import { Host } from './schemas'

const batchCreateHost = batchCreateEntity(Host)

export default batchCreateHost
