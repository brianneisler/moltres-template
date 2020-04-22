import { AllowedImageType } from '../../../constants'
import { values } from '../../../utils/data'
import Joi from '@hapi/joi'

const ImageMeta = Joi.object().keys({
  contentType: Joi.string()
    .valid(...values(AllowedImageType))
    .required(),
  hash: Joi.string().hex().required(),
  height: Joi.number().integer().required(),
  length: Joi.number().integer().required(),
  path: Joi.string().required(),
  storageBucket: Joi.string().required(),
  width: Joi.number().integer().required()
})

export default ImageMeta
