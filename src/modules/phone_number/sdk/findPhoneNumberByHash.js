import { findOneFromQuery } from 'moltres/db'
import { assoc } from 'moltres/lang'

import queryPhoneNumbers from './queryPhoneNumbers'

const findPhoneNumberByHash = async (context, hash, queryOptions = {}) => {
  queryOptions = assoc('limit', 1, queryOptions)
  return findOneFromQuery(
    context,
    queryPhoneNumbers(context, { hash }, queryOptions),
    queryOptions
  )
}

export default findPhoneNumberByHash
