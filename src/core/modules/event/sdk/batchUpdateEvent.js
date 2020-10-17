import { batchUpdateEntity } from '../../entity'
import { Event } from '../schemas'

const batchUpdateEvent = batchUpdateEntity(Event)

export default batchUpdateEvent
