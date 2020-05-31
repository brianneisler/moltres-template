import { AllowedImageType } from '../../../constants'
import { Entity } from '../../Entity'
import { id } from '../../../utils/schema'
import { values } from '../../../utils/data'
import Joi from '@hapi/joi'

const Image = {
  collectionName: 'Images',
  name: 'Image',
  schema: Entity.keys({
    contentType: Joi.string()
      .valid(...values(AllowedImageType))
      .required(),
    hash: Joi.string().hex().required(),
    height: Joi.number().integer().positive().allow(0).required(),
    length: Joi.number().integer().positive().allow(0).required(),
    path: Joi.string(),
    storageBucket: Joi.string().required(),
    // TODO BRN: Replace uploadId with a sourceEntity concept which can be of type
    // 'Upload' or 'Url'
    uploadId: id(),
    width: Joi.number().integer().positive().allow(0).required()
  })
}

export default Image
