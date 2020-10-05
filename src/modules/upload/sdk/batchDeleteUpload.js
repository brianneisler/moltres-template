import { batchDeleteEntity } from '../../../core/sdk'
import { Upload } from '../schemas'

const batchDeleteUpload = batchDeleteEntity(Upload)

export default batchDeleteUpload
