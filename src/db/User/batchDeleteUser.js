import { User } from './schemas'
import { batchDeleteEntity } from '../Entity'

const batchDeleteUser = batchDeleteEntity(User)

export default batchDeleteUser
