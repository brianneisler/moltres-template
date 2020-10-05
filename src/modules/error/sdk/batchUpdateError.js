import { batchUpdateEntity } from '../../../core/sdk'
import { Error } from '../schemas'

const batchUpdateError = batchUpdateEntity(Error)

export default batchUpdateError
