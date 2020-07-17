import { batchDeleteEntity } from '../Entity'

import { Error } from './schemas'

const batchDeleteError = batchDeleteEntity(Error)

export default batchDeleteError
