import { createAction } from 'redux-actions'

const setQueryAction = createAction(
  'QUERY:SET_QUERY',
  ({ query, queryKey }) => ({
    query,
    queryKey
  })
)

export default setQueryAction
