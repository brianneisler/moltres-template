import { last, map } from '../data'

const nextPage = async (builder, { cursor, limit }) => {
  const ref = builder({
    cursor,
    limit
  })
  return ref.get()
}

const paginateQuery = async (builder, iteratee, { limit = 10 } = {}) => {
  let done = false
  let cursor
  while (!done) {
    const query = await nextPage(builder, { cursor, limit })
    await Promise.all(map(iteratee, query.docs))
    cursor = query
    if (query.docs.length >= limit) {
      cursor = last(query.docs)
    } else {
      done = true
    }
  }
}

export default paginateQuery
