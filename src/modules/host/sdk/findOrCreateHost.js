import { findOrCreateEntity } from 'moltres/core'
import { Host } from '../schemas'

const findOrCreateHost = findOrCreateEntity(Host)

export default findOrCreateHost
