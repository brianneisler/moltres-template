import { findOneFromQuery } from '../../utils/db'
import { assoc } from '../../utils/lang'

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
