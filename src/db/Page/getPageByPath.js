import { getOneFromQuery } from '../../utils/db'
import { assoc } from '../../utils/lang'

import queryPages from './queryPages'

const getPageByPath = async (context, path, queryOptions = {}) => {
  queryOptions = assoc('limit', 1, queryOptions)
  return getOneFromQuery(
    context,
    queryPages(context, { path }, queryOptions),
    queryOptions
  )
}

export default getPageByPath
