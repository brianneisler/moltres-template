import { batchCreateEntity } from '../../../core/sdk'
import { Upload } from '../schemas'

const batchCreateUpload = batchCreateEntity(Upload)

export default batchCreateUpload
