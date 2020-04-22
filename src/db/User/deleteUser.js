import { User } from './schemas'
import { deleteEntity } from '../Entity'

const deleteUser = deleteEntity(User)

export default deleteUser
