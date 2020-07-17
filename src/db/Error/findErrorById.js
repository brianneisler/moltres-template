import { findDocumentById } from '../../utils/db'

import { Error } from './schemas'

const findErrorById = findDocumentById(Error)

export default findErrorById
