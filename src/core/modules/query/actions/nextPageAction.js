import { createAction } from 'redux-actions'

const nextPageAction = createAction('QUERY:NEXT_PAGE', (queryKey) => ({
  queryKey
}))

export default nextPageAction
