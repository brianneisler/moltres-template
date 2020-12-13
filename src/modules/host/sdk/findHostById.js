import { findDocumentById } from 'moltres/db'
import { Host } from '../schemas'

const findHostById = findDocumentById(Host)

export default findHostById
