import { batchUpdateEntity } from '../../../core/sdk'
import { Url } from '../schemas'

const batchUpdateUrl = batchUpdateEntity(Url)

export default batchUpdateUrl
