import { curry } from '../lang'

const collection = curry((Schema, context, data = null) => {
  const { database } = context
  let { parentRef } = context
  if (!Schema) {
    throw new Error('Schema must be defined')
  }
  if (!parentRef && Schema.parentSchema) {
    if (Schema.parentRefIdField) {
      if (!data || !data[Schema.parentRefIdField]) {
        throw new Error(
          `data must contain the parentRefIdField ${Schema.parentRefIdField}`
        )
      }
      const parentCollection = collection(Schema.parentSchema, context, data)
      parentRef = parentCollection.doc(data[Schema.parentRefIdField])
    } else {
      return database.collectionGroup(Schema.collectionName)
    }
  }
  const targetRef = parentRef || database
  return targetRef.collection(Schema.collectionName)
})

export default collection
