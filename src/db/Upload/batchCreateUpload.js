import { Upload } from './schemas'
import { batchCreateEntity } from '../Entity'

const batchCreateUpload = batchCreateEntity(Upload)

export default batchCreateUpload
