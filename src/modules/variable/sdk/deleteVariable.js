import { deleteEntity } from 'moltres/core'
import { Variable } from '../schemas'

const deleteVariable = deleteEntity(Variable)

export default deleteVariable
