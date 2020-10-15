import { batchRemoveEntity } from '../../entity'
import { Event } from '../schemas'

const batchRemoveEvent = batchRemoveEntity(Event)

export default batchRemoveEvent
