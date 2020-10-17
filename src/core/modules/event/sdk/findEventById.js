import { findDocumentById } from '../../../../utils/db'
import { Event } from '../schemas'

const findEventById = findDocumentById(Event)

export default findEventById
