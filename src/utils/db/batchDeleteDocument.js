import { curry } from '../lang'

import refDocumentById from './refDocumentById'

const batchDeleteDocument = curry((Schema, context, batch, id) => {
  const ref = refDocumentById(Schema, context, id)
  batch.delete(ref)
  return ref
})

export default batchDeleteDocument
