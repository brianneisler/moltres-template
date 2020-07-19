import { curry, map } from '../lang'

import indexDoc from './indexDoc'

const batchUpdateIndexes = curry(
  ({ collectionName, indexes }, context, batch, data, document) => {
    const prevData = document.data()
    return map((index) => {
      const prevIndexRef = indexDoc(context, collectionName, index, prevData)
      const nextIndexRef = indexDoc(context, collectionName, index, data)
      if (nextIndexRef.path !== prevIndexRef.path) {
        batch.set(nextIndexRef, {
          value: document.id
        })
        batch.delete(prevIndexRef)
      }
      return nextIndexRef
    }, indexes || [])
  }
)

export default batchUpdateIndexes
