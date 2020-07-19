import { batchUpdateEntity } from '../Entity'

import { User } from './schemas'

const batchUpdateUser = batchUpdateEntity(User)

export default batchUpdateUser
