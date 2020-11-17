import { batchUpdateEntity } from 'moltres/core'
import { Error } from '../schemas'

const batchUpdateError = batchUpdateEntity(Error)

export default batchUpdateError
