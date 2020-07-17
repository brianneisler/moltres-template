import { batchDeleteEntity } from '../Entity'

import { Upload } from './schemas'

const batchDeleteUpload = batchDeleteEntity(Upload)

export default batchDeleteUpload
