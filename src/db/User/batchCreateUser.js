import { User } from './schemas'
import { batchCreateEntity } from '../Entity'

const batchCreateUser = batchCreateEntity(User)

export default batchCreateUser
