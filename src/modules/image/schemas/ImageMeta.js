import { AllowedImageType } from '../../../constants'
import { Integer, Object, String } from 'moltres/core'
import { values } from 'moltres/lang'

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
