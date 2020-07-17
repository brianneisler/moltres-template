import { batchCreateEntity } from '../Entity'

import { Url } from './schemas'

const batchCreateUrl = batchCreateEntity(Url)

export default batchCreateUrl
