import { getDocumentById } from '../../../../utils/db'
import { Event } from '../schemas'

const getEventById = getDocumentById(Event)

export default getEventById
