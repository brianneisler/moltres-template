import { Host } from './schemas'
import { batchCreateEntity } from '../Entity'

const batchCreateHost = batchCreateEntity(Host)

export default batchCreateHost
