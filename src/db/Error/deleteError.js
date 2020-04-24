import { Error } from './schemas'
import { deleteEntity } from '../Entity'

const deleteError = deleteEntity(Error)

export default deleteError
