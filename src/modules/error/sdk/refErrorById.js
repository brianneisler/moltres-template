import { refDocumentById } from 'moltres/db'

import { Error } from '../schemas'

const refErrorById = refDocumentById(Error)

export default refErrorById
