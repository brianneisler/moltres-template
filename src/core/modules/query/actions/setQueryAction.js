import { createAction } from '../../../../utils/redux'

const setQueryAction = createAction(
  'QUERY:SET_QUERY',
  ({ query, queryKey }) => ({
    query,
    queryKey
  })
)

export default setQueryAction
