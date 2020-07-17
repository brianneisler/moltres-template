import { AllowedImageType } from '../../../constants'
import { Integer, Object, String } from '../../../core/schemas'
import { values } from '../../../utils/lang'

const ImageMeta = Object.schema.keys({
  contentType: String.schema.valid(...values(AllowedImageType)).required(),
  hash: String.schema.hex().required(),
  height: Integer.schema.required(),
  length: Integer.schema.required(),
  path: String.schema.required(),
  storageBucket: String.schema.required(),
  width: Integer.schema.required()
})

export default ImageMeta
