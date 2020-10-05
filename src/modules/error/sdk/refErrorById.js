import { refDocumentById } from '../../../utils/db'
import { Error } from '../schemas'

const refErrorById = refDocumentById(Error)

export default refErrorById
