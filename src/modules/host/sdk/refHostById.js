import { refDocumentById } from 'moltres/db'
import { Host } from '../schemas'

const refHostById = refDocumentById(Host)

export default refHostById
