import { batchCreateEntity } from '../Entity'

import { Upload } from './schemas'

const batchCreateUpload = batchCreateEntity(Upload)

export default batchCreateUpload
