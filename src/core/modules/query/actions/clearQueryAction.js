import { createAction } from 'redux-actions'

const clearQueryAction = createAction('QUERY:CLEAR_QUERY', ({ queryKey }) => ({
  queryKey
}))

export default clearQueryAction
