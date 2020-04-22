import { createAction } from 'redux-actions'

const setQueryCursorNextAction = createAction(
  'QUERY:SET_QUERY_CURSOR_NEXT',
  ({ cursor, queryKey }) => ({
    cursor,
    queryKey
  })
)

export default setQueryCursorNextAction
