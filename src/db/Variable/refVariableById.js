import { Variable } from './schemas'
import { refDocumentById } from '../../utils/db'

const refVariableById = refDocumentById(Variable)

export default refVariableById
