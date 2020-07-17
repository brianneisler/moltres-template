import { batchRemoveEntity } from '../Entity'

import { Host } from './schemas'

const batchRemoveHost = batchRemoveEntity(Host)

export default batchRemoveHost
