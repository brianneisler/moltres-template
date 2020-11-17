import { batchRemoveEntity } from 'moltres/core'

import { Upload } from '../schemas'

const batchRemoveUpload = batchRemoveEntity(Upload)

export default batchRemoveUpload
