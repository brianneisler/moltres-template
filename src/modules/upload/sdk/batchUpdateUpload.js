import { batchUpdateEntity } from 'moltres/core'
import { Upload } from '../schemas'

const batchUpdateUpload = batchUpdateEntity(Upload)

export default batchUpdateUpload
