import { batchDeleteEntity } from '../Entity'

import { User } from './schemas'

const batchDeleteUser = batchDeleteEntity(User)

export default batchDeleteUser
