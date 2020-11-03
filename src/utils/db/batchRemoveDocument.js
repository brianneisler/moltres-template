import { curry, pipe } from '../lang'

import addRemovedAtTimestamp from './addRemovedAtTimestamp'
import addRemovedByEntity from './addRemovedByEntity'
import cleanseData from './cleanseData'
import convertDataToFirebase from './convertDataToFirebase'
import refDocumentById from './refDocumentById'

const batchRemoveDocument = curry((Schema, context, batch, id, data) => {
  const ref = refDocumentById(Schema, context, id)
  data = pipe(
    cleanseData(Schema),
    convertDataToFirebase(context),
    addRemovedAtTimestamp(context),
    addRemovedByEntity(context)
  )(data)

  batch.update(ref, data)
  return ref
})

export default batchRemoveDocument
