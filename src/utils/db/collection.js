import { curry } from '../lang'

const collection = curry((Schema, { database, parentRef }) => {
  if (!Schema) {
    throw new Error('Schema must be defined')
  }
  if (!parentRef && Schema.parentSchema) {
    return database.collectionGroup(Schema.collectionName)
  }
  const targetRef = parentRef || database
  return targetRef.collection(Schema.collectionName)
})

export default collection
