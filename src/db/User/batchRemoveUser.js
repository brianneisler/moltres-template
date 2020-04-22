import { User } from './schemas'
import { batchRemoveEntity } from '../Entity'

const batchRemoveUser = batchRemoveEntity(User)

export default batchRemoveUser
