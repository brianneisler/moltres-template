import { Entity } from '../../Entity'
import { Id, Object, String } from '../../../core/schemas'
import { UploadState } from '../../../constants'
import { values } from '../../../utils/lang'

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
