import { User } from './schemas'
import { createEntity } from '../Entity'

const createUser = createEntity(User)

export default createUser
