import { deleteEntity } from '../../../core/sdk'
import { User } from '../schemas'

const deleteUser = deleteEntity(User)

export default deleteUser
