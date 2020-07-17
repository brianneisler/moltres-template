import { findAllFromQuery } from '../../utils/db'
import { cacheMethod, getProp } from '../../utils/lang'

import queryInternalPhoneNumbers from './queryInternalPhoneNumbers'
import { InternalPhoneNumber } from './schemas'

const CACHE_KEY = `${InternalPhoneNumber.collectionName}:all`
const findAllInternalPhoneNumbers = cacheMethod(
  {
    key: (context, options) =>
      `${CACHE_KEY}:${!!getProp('includeRemoved', options)}`,
    ttl: 60 * 60 * 1000
  },
  async (context, queryOptions = {}) =>
    findAllFromQuery(
      context,
      queryInternalPhoneNumbers(context, {}, queryOptions),
      queryOptions
    )
)

export default findAllInternalPhoneNumbers
