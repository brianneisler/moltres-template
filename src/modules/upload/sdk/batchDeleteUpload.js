import { batchDeleteEntity } from 'moltres/core'
import { Upload } from '../schemas'

const batchDeleteUpload = batchDeleteEntity(Upload)

export default batchDeleteUpload
