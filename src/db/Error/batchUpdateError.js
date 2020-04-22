import { Error } from './schemas'
import { batchUpdateEntity } from '../Entity'

const batchUpdateError = batchUpdateEntity(Error)

export default batchUpdateError
