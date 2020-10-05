import { batchUpdateEntity } from '../../../core/sdk'
import { Upload } from '../schemas'

const batchUpdateUpload = batchUpdateEntity(Upload)

export default batchUpdateUpload
