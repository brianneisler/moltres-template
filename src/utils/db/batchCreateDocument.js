import { curry, getProp, isNil } from '../lang'

import addTimestamps from './addTimestamps'
import collection from './collection'

const batchCreateDocument = curry((Schema, context, batch, data) => {
  const { idField } = Schema
  const Collection = collection(Schema, context)

  let ref
  if (isNil(idField)) {
    ref = Collection.doc()
  } else {
    ref = Collection.doc(getProp(idField, data).toString())
  }

  batch.set(ref, addTimestamps(context, data))

  return ref
})

export default batchCreateDocument
