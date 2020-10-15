import { batchCreateEntity } from '../../entity'
import { Event } from '../schemas'

const batchCreateEvent = batchCreateEntity(Event)

export default batchCreateEvent
