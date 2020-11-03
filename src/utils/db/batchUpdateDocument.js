import { curry } from '../lang'

import addUpdatedAtTimestamp from './addUpdatedAtTimestamp'
import cleanseData from './cleanseData'
import convertDataToFirebase from './convertDataToFirebase'
import refDocumentById from './refDocumentById'

const batchUpdateDocument = curry((Schema, context, batch, id, data) => {
  const ref = refDocumentById(Schema, context, id)
  batch.update(
    ref,
    addUpdatedAtTimestamp(
      context,
      convertDataToFirebase(context, cleanseData(Schema, data))
    )
  )
  return ref
})

export default batchUpdateDocument
