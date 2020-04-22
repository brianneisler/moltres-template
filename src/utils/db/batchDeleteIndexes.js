import { curry, map } from '../data'
import indexDoc from './indexDoc'

const batchDeleteIndexes = curry(({ collectionName, indexes }, context, batch, data) =>
  map((index) => {
    const indexRef = indexDoc(context, collectionName, index, data)
    batch.delete(indexRef)
    return indexRef
  }, indexes || [])
)

export default batchDeleteIndexes
