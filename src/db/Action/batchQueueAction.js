import { addTimestamps, collection } from '../../utils/db'
import { curry, omit } from '../../utils/lang'
import { validateSchema } from '../../utils/schema'

import { Action } from './schemas'

const batchQueueAction = curry((Schema, context, batch, value) => {
  const data = validateSchema(Schema, value)
  const Actions = collection(Action, omit(['parentRef'], context))
  const ref = Actions.doc(`${data.type}/queue/${data.id}`)

  batch.set(ref, addTimestamps(context, { action: data }))

  return ref
})

export default batchQueueAction
