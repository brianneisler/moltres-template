import { findOrCreateEntity } from '../../../core/sdk'
import { Host } from '../schemas'

const findOrCreateHost = findOrCreateEntity(Host)

export default findOrCreateHost
