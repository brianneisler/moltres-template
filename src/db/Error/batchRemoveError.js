import { batchRemoveEntity } from '../Entity'

import { Error } from './schemas'

const batchRemoveError = batchRemoveEntity(Error)

export default batchRemoveError
