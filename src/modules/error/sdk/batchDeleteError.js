import { batchDeleteEntity } from '../../../core/sdk'
import { Error } from '../schemas'

const batchDeleteError = batchDeleteEntity(Error)

export default batchDeleteError
