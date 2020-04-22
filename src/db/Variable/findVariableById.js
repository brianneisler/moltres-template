import { Variable } from './schemas'
import { findDocumentById } from '../../utils/db'

const findVariableById = findDocumentById(Variable)

export default findVariableById
