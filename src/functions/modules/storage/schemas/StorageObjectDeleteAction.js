import { Action } from '../../../../db/Action'
import { Integer, Object, String } from '../../../../core/schemas'

const StorageObjectDeleteAction = {
  schema: Action.schema.keys({
    payload: Object.schema.keys({
      bucket: String.schema.required(),
      contentLanguage: String.schema,
      contentType: String.schema.required(),
      crc32c: String.schema.required(),
      etag: String.schema.required(),
      generation: String.schema.required(),
      id: String.schema.required(),
      kind: String.schema.required(),
      md5Hash: String.schema.required(),
      mediaLink: String.schema.required(),
      metadata: Object.schema,
      metageneration: Integer.schema.required(),
      name: String.schema.required(),
      selfLink: String.schema.required(),
      size: Integer.schema.required(),
      storageClass: String.schema.required(),
      timeCreated: String.schema.required(),
      timeStorageClassUpdated: String.schema.required(),
      updated: String.schema.required()
    })
  }),
  type: 'STORAGE:OBJECT_DELETE'
}

export default StorageObjectDeleteAction
