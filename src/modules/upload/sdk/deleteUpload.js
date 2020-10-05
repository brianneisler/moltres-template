import { deleteEntity } from '../../../core/sdk'
import { Upload } from '../schemas'

const deleteUpload = deleteEntity(Upload)

export default deleteUpload
