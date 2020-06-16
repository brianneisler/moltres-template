import { Host } from './schemas'
import { findOrCreateEntity } from '../Entity'

const findOrCreateHost = findOrCreateEntity(Host)

export default findOrCreateHost
