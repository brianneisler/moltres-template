import { Host } from './schemas'
import { batchRemoveEntity } from '../Entity'

const batchRemoveHost = batchRemoveEntity(Host)

export default batchRemoveHost
