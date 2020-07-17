import { curry } from '../lang'

import collection from './collection'

const queryCollection = curry((Schema, context, { cursor, limit }) => {
  let ref = collection(Schema, context)
  if (cursor) {
    ref = ref.startAfter(cursor)
  }
  if (limit) {
    ref = ref.limit(limit)
  }
  return ref
})

export default queryCollection
