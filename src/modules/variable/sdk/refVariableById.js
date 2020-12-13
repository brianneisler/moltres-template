import { refDocumentById } from 'moltres/db'
import { Variable } from '../schemas'

const refVariableById = refDocumentById(Variable)

export default refVariableById
