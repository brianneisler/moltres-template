import { batchCreateEntity } from 'moltres/core'
import { Host } from '../schemas'

const batchCreateHost = batchCreateEntity(Host)

export default batchCreateHost
