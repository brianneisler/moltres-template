import { batchRemoveEntity } from '../../../core/sdk'
import { Error } from '../schemas'

const batchRemoveError = batchRemoveEntity(Error)

export default batchRemoveError
