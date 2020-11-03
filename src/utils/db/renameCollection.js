import validateSchema from '../schema/validateSchema'

import batchSetDocument from './batchSetDocument'
import batchSetIndexes from './batchSetIndexes'
import buildBatch from './buildBatch'
import cleanseData from './cleanseData'
import collection from './collection'
import commitBatch from './commitBatch'
import paginateCollection from './paginateCollection'
import refGet from './refGet'

const renameCollection = async (context, OldSchema, NewSchema) => {
  await paginateCollection(OldSchema, context, async (doc) => {
    const value = doc.data()
    await commitBatch(
      buildBatch(context, async (batch) => {
        const data = validateSchema(NewSchema, cleanseData(NewSchema, value))

        const Collection = collection(NewSchema, context)
        const ref = Collection.doc(doc.id.toString())
        const document = await refGet(context, ref)

        batchSetDocument(NewSchema, context, batch, doc.id, data, document)
        batchSetIndexes(NewSchema, context, batch, data, document)
      })
    )
  })
}

export default renameCollection
