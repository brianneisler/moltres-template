import { User } from './schemas'
import { updateEntity } from '../Entity'

const updateUser = updateEntity(User)

export default updateUser
