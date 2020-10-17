import { saveEntity } from '../../entity'
import { Event } from '../schemas'

const saveEvent = saveEntity(Event)

export default saveEvent
