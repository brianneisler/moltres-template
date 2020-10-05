import { deleteEntity } from '../../../core/sdk'
import { Error } from '../schemas'

const deleteError = deleteEntity(Error)

export default deleteError
