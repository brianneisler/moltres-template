import { batchCreateEntity } from '../Entity'

import { Error } from './schemas'

const batchCreateError = batchCreateEntity(Error)

export default batchCreateError
