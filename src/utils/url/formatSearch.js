import { getProp, isObject, join, keys, map } from '../lang'

const formatSearch = (query) =>
  '?' +
  join(
    '&',
    map((searchKey) => {
      let searchParam = getProp(searchKey, query)
      if (isObject(searchParam)) {
        searchParam = JSON.stringify(searchParam)
      }
      return `${searchKey}=${encodeURIComponent(searchParam)}`
    }, keys(query))
  )

export default formatSearch
