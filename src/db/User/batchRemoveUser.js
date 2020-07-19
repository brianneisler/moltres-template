import { batchRemoveEntity } from '../Entity'

import { User } from './schemas'

const batchRemoveUser = batchRemoveEntity(User)

export default batchRemoveUser
