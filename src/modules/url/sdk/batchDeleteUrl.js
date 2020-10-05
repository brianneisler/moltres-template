import { batchDeleteEntity } from '../../../core/sdk'
import { Url } from '../schemas'

const batchDeleteUrl = batchDeleteEntity(Url)

export default batchDeleteUrl
