import { findOrCreateEntity } from '../Entity'

import { Host } from './schemas'

const findOrCreateHost = findOrCreateEntity(Host)

export default findOrCreateHost
