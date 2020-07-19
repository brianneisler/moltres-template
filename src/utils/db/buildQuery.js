import { curry } from '../lang'

import collection from './collection'

const buildQuery = curry(
  (builder, Schema, context, { cursor, head, includeRemoved, limit }) => {
    let query = collection(Schema, context)
    query = builder(query)
    if (!includeRemoved) {
      query = query.where('removedAt', '==', null)
    }

    if (cursor && cursor !== 'init') {
      if (head) {
        query = query.endAt(cursor)
      } else {
        query = query.startAfter(cursor)
      }
    }

    if (cursor === 'init') {
      query = query.limit(1)
    } else if (limit && !head) {
      query = query.limit(limit)
    }

    return query
  }
)

export default buildQuery
