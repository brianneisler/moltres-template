import { Host } from './schemas'
import { batchDeleteEntity } from '../Entity'

const batchDeleteHost = batchDeleteEntity(Host)

export default batchDeleteHost
