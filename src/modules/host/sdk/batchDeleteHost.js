import { batchDeleteEntity } from 'moltres/core'
import { Host } from '../schemas'

const batchDeleteHost = batchDeleteEntity(Host)

export default batchDeleteHost
