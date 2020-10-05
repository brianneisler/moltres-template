import { parseSearch } from '../../../../utils/url'
import { selectRouterLocationSearch } from '../../router'

const selectAfterLogin = (state) => {
  const locationSearch = selectRouterLocationSearch(state)
  const values = parseSearch(locationSearch)
  if (values.afterLogin) {
    return JSON.parse(decodeURIComponent(values.afterLogin))
  }
}

export default selectAfterLogin
