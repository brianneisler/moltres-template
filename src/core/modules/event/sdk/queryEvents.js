import { queryEntities } from '../../entity'
import { Event } from '../schemas'

const queryEvents = queryEntities(Event)

export default queryEvents
