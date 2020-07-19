import { batchRemoveEntity } from '../Entity'

import { Upload } from './schemas'

const batchRemoveUpload = batchRemoveEntity(Upload)

export default batchRemoveUpload
