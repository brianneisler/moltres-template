import { SET } from '../../constants/EntityChangeType'
import {
  batchSetDocument,
  batchSetIndexes,
  cleanseData,
  collection
} from '../../utils/db'
import { curry } from '../../utils/lang'
import { validateSchema } from '../../utils/schema'

import { entityChanged } from './actions'
import batchQueueEntityChangedAction from './batchQueueEntityChangedAction'

const batchSetEntity = curry(
  async (Schema, context, batch, id, value, options = {}) => {
    const data = validateSchema(Schema, cleanseData(value))

    const Collection = collection(Schema, context)
    const ref = Collection.doc(id.toString())
    const document = await ref.get()

    batchSetDocument(Schema, context, batch, id, data, document)
    batchSetIndexes(Schema, context, batch, data, document)
    if (!options.noChangeActions) {
      batchQueueEntityChangedAction(
        context,
        batch,
        entityChanged(context, {
          changeType: SET,
          data,
          entityId: ref.id,
          entityPath: ref.path,
          entityType: Schema.name,
          prevData: document.data() || null
        })
      )
    }

    return ref
  }
)

export default batchSetEntity
