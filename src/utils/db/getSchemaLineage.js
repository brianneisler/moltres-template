import { prepend } from '../lang'

const getSchemaLineage = (Schema, schemas = []) => {
  schemas = prepend(Schema, schemas)
  if (Schema.parentSchema) {
    return getSchemaLineage(Schema.parentSchema, schemas)
  }
  return schemas
}

export default getSchemaLineage
