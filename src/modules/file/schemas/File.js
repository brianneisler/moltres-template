import { Entity, Id, Object, String } from '../../../core/schemas'

const File = {
  collectionName: 'Files',
  name: 'File',
  schema: Entity.schema.keys({
    contentType: String.schema
      // .valid(...values(AllowedImageType))
      .required(),
    hash: String.schema.hex().required(),
    path: String.schema,
    source: Object.schema
      .keys({
        entityType: String.schema.required,
        id: Id.schema.required()
      })
      .required(),
    storageBucket: String.schema.required()
  })
}

export default File
