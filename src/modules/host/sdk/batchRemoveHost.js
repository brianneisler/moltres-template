import { batchRemoveEntity } from 'moltres/core'
import { Host } from '../schemas'

const batchRemoveHost = batchRemoveEntity(Host)

export default batchRemoveHost
