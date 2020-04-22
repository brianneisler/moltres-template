import { Error } from './schemas'
import { findDocumentById } from '../../utils/db'

const findErrorById = findDocumentById(Error)

export default findErrorById
