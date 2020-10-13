import { curry, getProperty } from '../../../../utils/lang'

import selectQueryResults from './selectQueryResults'

const selectCursorResults = curry((queryKey, cursor, state) => {
  const results = selectQueryResults(queryKey, state)
  return getProperty(cursor.id, results)
})

export default selectCursorResults
