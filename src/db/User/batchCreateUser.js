import { batchCreateEntity } from '../Entity'

import { User } from './schemas'

const batchCreateUser = batchCreateEntity(User)

export default batchCreateUser
