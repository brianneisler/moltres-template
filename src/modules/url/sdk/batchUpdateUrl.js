import { batchUpdateEntity } from 'moltres/core'
import { Url } from '../schemas'

const batchUpdateUrl = batchUpdateEntity(Url)

export default batchUpdateUrl
