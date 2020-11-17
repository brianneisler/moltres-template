import { findDocumentById } from 'moltres/db'
import { Variable } from '../schemas'

const findVariableById = findDocumentById(Variable)

export default findVariableById
