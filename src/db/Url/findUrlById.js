import { Url } from './schemas'
import { findDocumentById } from '../../utils/db'

const findUrlById = findDocumentById(Url)

export default findUrlById
