import { batchRemoveEntity } from 'moltres/core'

import { Error } from '../schemas'

const batchRemoveError = batchRemoveEntity(Error)

export default batchRemoveError
