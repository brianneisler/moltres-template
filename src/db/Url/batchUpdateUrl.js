import { Url } from './schemas'
import { batchUpdateEntity } from '../Entity'

const batchUpdateUrl = batchUpdateEntity(Url)

export default batchUpdateUrl
