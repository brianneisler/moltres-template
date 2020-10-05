import { deleteEntity } from '../../../core/sdk'
import { Variable } from '../schemas'

const deleteVariable = deleteEntity(Variable)

export default deleteVariable
