import { batchCreateEntity } from 'moltres/core'

import { Error } from '../schemas'

const batchCreateError = batchCreateEntity(Error)

export default batchCreateError
