import { Error } from './schemas'
import { refDocumentById } from '../../utils/db'

const refErrorById = refDocumentById(Error)

export default refErrorById
