import { batchUpdateEntity } from '../Entity'

import { Upload } from './schemas'

const batchUpdateUpload = batchUpdateEntity(Upload)

export default batchUpdateUpload
