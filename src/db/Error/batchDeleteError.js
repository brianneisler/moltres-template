import { Error } from './schemas'
import { batchDeleteEntity } from '../Entity'

const batchDeleteError = batchDeleteEntity(Error)

export default batchDeleteError
