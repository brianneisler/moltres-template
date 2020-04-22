import { curry, getProp } from '../../../../utils/data'
import selectQueryResults from './selectQueryResults'

const selectCursorResults = curry((queryKey, cursor, state) => {
  const results = selectQueryResults(queryKey, state)
  return getProp(cursor.id, results)
})

export default selectCursorResults
