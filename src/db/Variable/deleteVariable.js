import { Variable } from './schemas'
import { deleteEntity } from '../Entity'

const deleteVariable = deleteEntity(Variable)

export default deleteVariable
