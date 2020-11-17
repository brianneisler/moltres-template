import { batchCreateEntity } from 'moltres/core'
import { Upload } from '../schemas'

const batchCreateUpload = batchCreateEntity(Upload)

export default batchCreateUpload
