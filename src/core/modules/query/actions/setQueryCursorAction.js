import { createAction } from '../../../../utils/redux'

const setQueryCursorAction = createAction(
  'QUERY:SET_QUERY_CURSOR',
  ({ cursor, queryKey }) => ({
    cursor,
    queryKey
  })
)

export default setQueryCursorAction
