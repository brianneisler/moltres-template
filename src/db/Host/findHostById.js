import { Host } from './schemas'
import { findDocumentById } from '../../utils/db'

const findHostById = findDocumentById(Host)

export default findHostById
