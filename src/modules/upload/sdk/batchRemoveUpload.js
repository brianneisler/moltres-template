import { batchRemoveEntity } from '../../../core/sdk'
import { Upload } from '../schemas'

const batchRemoveUpload = batchRemoveEntity(Upload)

export default batchRemoveUpload
