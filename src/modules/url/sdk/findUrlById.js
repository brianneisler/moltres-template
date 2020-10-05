import { findDocumentById } from '../../../utils/db'
import { Url } from '../schemas'

const findUrlById = findDocumentById(Url)

export default findUrlById
