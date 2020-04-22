import { Action } from '../../../../db/Action'
import Joi from '@hapi/joi'

const StorageObjectFinalizeAction = {
  schema: Action.schema.keys({
    payload: Joi.object().keys({
      bucket: Joi.string().required(),
      contentLanguage: Joi.string(),
      contentType: Joi.string().required(),
      crc32c: Joi.string().required(),
      etag: Joi.string().required(),
      generation: Joi.string().required(),
      id: Joi.string().required(),
      kind: Joi.string().required(),
      md5Hash: Joi.string().required(),
      mediaLink: Joi.string().required(),
      metadata: Joi.object(),
      metageneration: Joi.number().integer().required(),
      name: Joi.string().required(),
      selfLink: Joi.string().required(),
      size: Joi.number().integer().required(),
      storageClass: Joi.string().required(),
      timeCreated: Joi.string().required(),
      timeStorageClassUpdated: Joi.string().required(),
      updated: Joi.string().required()
    })
  }),
  type: 'STORAGE:OBJECT_FINALIZE'
}

export default StorageObjectFinalizeAction
