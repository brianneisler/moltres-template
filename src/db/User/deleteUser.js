import { deleteEntity } from '../Entity'

import { User } from './schemas'

const deleteUser = deleteEntity(User)

export default deleteUser
