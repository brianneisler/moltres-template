import { findDocumentById } from '../../utils/db'

import { Variable } from './schemas'

const findVariableById = findDocumentById(Variable)

export default findVariableById
