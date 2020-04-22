import { Upload } from './schemas'
import { batchUpdateEntity } from '../Entity'

const batchUpdateUpload = batchUpdateEntity(Upload)

export default batchUpdateUpload
