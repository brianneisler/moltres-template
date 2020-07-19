import { curry, map } from '../lang'

import indexDoc from './indexDoc'

const batchSetIndexes = curry(
  ({ collectionName, indexes }, context, batch, data, document) => {
    const prevData = document.data()
    return map((index) => {
      const nextIndexRef = indexDoc(context, collectionName, index, data)
      if (prevData) {
        const prevIndexRef = indexDoc(context, collectionName, index, prevData)
        if (nextIndexRef.path !== prevIndexRef.path) {
          batch.delete(prevIndexRef)
          batch.set(nextIndexRef, {
            value: document.id
          })
        }
      } else {
        batch.set(nextIndexRef, {
          value: document.id
        })
      }
      return nextIndexRef
    }, indexes || [])
  }
)

export default batchSetIndexes
