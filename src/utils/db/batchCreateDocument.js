import { curry, getProperty, isNil } from '../lang'

import addTimestamps from './addTimestamps'
import collection from './collection'

/**
 * Adds a document create to the given WriteBatch of the given Schema type with
 * the given data. Returns the DocumentReference of the document to be created
 * when the batch is commited.
 *
 * @param {Schema} Schema
 * @param {Context} context
 * @param {WriteBatch} batch
 * @param {Object} data
 * @returns {DocumentReference}
 */
const batchCreateDocument = curry((Schema, context, batch, data) => {
  const Collection = collection(Schema, context, data)

  const { idField } = Schema
  let ref
  if (isNil(idField)) {
    ref = Collection.doc()
  } else {
    ref = Collection.doc(getProperty(idField, data).toString())
  }

  batch.set(ref, addTimestamps(context, data))

  return ref
})

export default batchCreateDocument
