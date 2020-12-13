import { findDocumentById } from 'moltres/db'
import { Url } from '../schemas'

const findUrlById = findDocumentById(Url)

export default findUrlById
