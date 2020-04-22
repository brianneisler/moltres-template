import { Error } from './schemas'
import { batchCreateEntity } from '../Entity'

const batchCreateError = batchCreateEntity(Error)

export default batchCreateError
