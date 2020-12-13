import { deleteEntity } from 'moltres/core'
import { Error } from '../schemas'

const deleteError = deleteEntity(Error)

export default deleteError
