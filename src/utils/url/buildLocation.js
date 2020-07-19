import { cleanse, isEmpty, isFunction, isObject, isString, omit } from '../lang'

import formatSearch from './formatSearch'
import parseURL from './parseURL'

const buildLocation = (value) => {
  if (isString(value)) {
    return parseURL(value)
  } else if (isFunction(value)) {
    return (...args) => buildLocation(value(...args))
  } else if (isObject(value)) {
    let { query, ...location } = value
    if (query) {
      query = cleanse(query)
      location = omit(['search'], location)
      if (!isEmpty(query)) {
        location = {
          ...location,
          search: formatSearch(query)
        }
      }
    }
    return location
  }

  throw new TypeError(
    `buildLocation expected 'value' parameter to be either a String, Function or Object. Instead received ${value}`
  )
}

export default buildLocation
