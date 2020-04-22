import { User } from './schemas'
import { batchUpdateEntity } from '../Entity'

const batchUpdateUser = batchUpdateEntity(User)

export default batchUpdateUser
