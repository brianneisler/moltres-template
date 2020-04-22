import paginateQuery from './paginateQuery'
import queryCollection from './queryCollection'

const paginateCollection = async (Schema, context, iteratee) =>
  paginateQuery(queryCollection(Schema, context), iteratee)

export default paginateCollection
