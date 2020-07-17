import { batchDeleteEntity } from '../Entity'

import { Url } from './schemas'

const batchDeleteUrl = batchDeleteEntity(Url)

export default batchDeleteUrl
