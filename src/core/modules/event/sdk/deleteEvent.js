import { deleteEntity } from '../../entity'
import { Event } from '../schemas'

const deleteEvent = deleteEntity(Event)

export default deleteEvent
