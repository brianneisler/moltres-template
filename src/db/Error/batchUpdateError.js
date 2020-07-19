import { batchUpdateEntity } from '../Entity'

import { Error } from './schemas'

const batchUpdateError = batchUpdateEntity(Error)

export default batchUpdateError
