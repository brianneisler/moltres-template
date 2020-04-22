import { Upload } from './schemas'
import { batchDeleteEntity } from '../Entity'

const batchDeleteUpload = batchDeleteEntity(Upload)

export default batchDeleteUpload
