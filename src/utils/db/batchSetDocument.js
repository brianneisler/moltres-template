import { curry } from '../lang'

import addTimestamps from './addTimestamps'
import addUpdatedAtTimestamp from './addUpdatedAtTimestamp'
import cleanseData from './cleanseData'
import refDocumentById from './refDocumentById'

const batchSetDocument = curry(
  async (Schema, context, batch, id, data, document) => {
    const ref = refDocumentById(Schema, context, id)
    const prevData = document.data()
    if (!document.exists) {
      data = addTimestamps(context, cleanseData(Schema, data))
    } else {
      data = addUpdatedAtTimestamp(
        context,
        // TODO BRN: Update this copy to use the Entity schema description
        cleanseData(Schema, {
          createdAt: prevData.createdAt,
          removedAt: prevData.removedAt,
          removedByEntityId: prevData.removedByEntityId,
          removedByEntityType: prevData.removedByEntityType,
          ...data
        })
      )
    }

    batch.set(ref, data)

    return ref
  }
)

export default batchSetDocument
