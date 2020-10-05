import { findDocumentById } from '../../../utils/db'
import { Host } from '../schemas'

const findHostById = findDocumentById(Host)

export default findHostById
