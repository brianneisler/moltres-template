import { findAllFromQuery } from 'moltres/db'
import { cacheMethod, getProperty } from 'moltres/lang'
import { InternalPhoneNumber } from '../schemas'

import queryInternalPhoneNumbers from './queryInternalPhoneNumbers'

const CACHE_KEY = `${InternalPhoneNumber.collectionName}:all`
const findAllInternalPhoneNumbers = cacheMethod(
  {
    key: (context, options) =>
      `${CACHE_KEY}:${!!getProperty('includeRemoved', options)}`,
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
