import { createAction } from '../../../../utils/redux'

const nextPageAction = createAction('QUERY:NEXT_PAGE', (queryKey) => ({
  queryKey
}))

export default nextPageAction
