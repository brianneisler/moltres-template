import { Error } from './schemas'
import { batchRemoveEntity } from '../Entity'

const batchRemoveError = batchRemoveEntity(Error)

export default batchRemoveError
