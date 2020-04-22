import { curry, map } from '../data'
import indexDoc from './indexDoc'

const batchCreateIndexes = curry(({ collectionName, indexes }, context, batch, data, ref) =>
  map((index) => {
    const indexRef = indexDoc(context, collectionName, index, data)
    batch.set(indexRef, {
      value: ref.id
    })
    return indexRef
  }, indexes || [])
)

export default batchCreateIndexes
