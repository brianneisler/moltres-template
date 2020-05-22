import { Host } from './schemas'
import { refDocumentById } from '../../utils/db'

const refHostById = refDocumentById(Host)

export default refHostById
