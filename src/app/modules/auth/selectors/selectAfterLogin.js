import queryString from 'query-string'

import { selectRouterLocationSearch } from '../../router'

const selectAfterLogin = (state) => {
  const locationSearch = selectRouterLocationSearch(state)
  const values = queryString.parse(locationSearch)
  if (values.afterLogin) {
    return JSON.parse(decodeURIComponent(values.afterLogin))
  }
}

export default selectAfterLogin
