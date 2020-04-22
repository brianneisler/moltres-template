import { User } from './schemas'
import { removeEntity } from '../Entity'

const removeUser = removeEntity(User)

export default removeUser
