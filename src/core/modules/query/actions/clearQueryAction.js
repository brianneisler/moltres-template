import { createAction } from '../../../../utils/redux'

const clearQueryAction = createAction('QUERY:CLEAR_QUERY', ({ queryKey }) => ({
  queryKey
}))

export default clearQueryAction
