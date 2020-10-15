import { batchDeleteEntity } from '../../entity'
import { Event } from '../schemas'

const batchDeleteEvent = batchDeleteEntity(Event)

export default batchDeleteEvent
