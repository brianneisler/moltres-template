import { values } from 'moltres/lang'

import { UploadState } from '../../../constants'
import { Entity, Id, Object, String } from 'moltres/core'

const Upload = {
  collectionName: 'Uploads',
  name: 'Upload',
  schema: Entity.schema.keys({
    errorId: Id.schema.allow(null).required(),
    meta: Object.schema,
    source: String.schema.required(),
    state: String.schema.valid(...values(UploadState)).required(),
    userId: Id.schema.required()
  })
}

export default Upload
