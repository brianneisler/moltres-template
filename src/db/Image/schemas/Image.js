import { AllowedImageType } from '../../../constants'
import { Id, Integer, String } from '../../../core/schemas'
import { values } from '../../../utils/lang'
import { Entity } from '../../Entity'

const Image = {
  collectionName: 'Images',
  name: 'Image',
  schema: Entity.schema.keys({
    contentType: String.schema.valid(...values(AllowedImageType)).required(),
    hash: String.schema.hex().required(),
    height: Integer.schema.positive().allow(0).required(),
    length: Integer.schema.positive().allow(0).required(),
    path: String.schema,
    storageBucket: String.schema.required(),
    // TODO BRN: Replace uploadId with a sourceEntity concept which can be of type
    // 'Upload' or 'Url'
    uploadId: Id.schema,
    width: Integer.schema.positive().allow(0).required()
  })
}

export default Image
