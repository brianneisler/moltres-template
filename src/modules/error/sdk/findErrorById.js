import { findDocumentById } from 'moltres/db'

import { Error } from '../schemas'

const findErrorById = findDocumentById(Error)

export default findErrorById
