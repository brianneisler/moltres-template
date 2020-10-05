import { batchCreateEntity } from '../../../core/sdk'
import { Error } from '../schemas'

const batchCreateError = batchCreateEntity(Error)

export default batchCreateError
