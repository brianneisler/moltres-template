import { Entity } from '../../Entity'
import { UploadState } from '../../../constants'
import { id } from '../../../utils/schema'
import { values } from '../../../utils/data'
import Joi from '@hapi/joi'

const Upload = {
  collectionName: 'Uploads',
  name: 'Upload',
  schema: Entity.keys({
    errorId: id().allow(null).required(),
    meta: Joi.object(),
    source: Joi.string().required(),
    state: Joi.string()
      .valid(...values(UploadState))
      .required(),
    userId: id().required()
  })
}

export default Upload
