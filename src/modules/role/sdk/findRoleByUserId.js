import { findOneFromQuery } from '../../../utils/db'
import { assoc } from '../../../utils/lang'

import queryRoles from './queryRoles'

const findRoleByUserId = async (context, userId, queryOptions = {}) => {
  queryOptions = assoc('limit', 1, queryOptions)
  return findOneFromQuery(
    context,
    queryRoles(context, { userId }, queryOptions),
    queryOptions
  )
}

export default findRoleByUserId
