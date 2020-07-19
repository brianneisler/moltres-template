import { URL, parse } from 'url'

import { invariant, isString } from '../lang'

import parseSearch from './parseSearch'

const parseURL = (url) => {
  invariant(isString(url), 'URL must be a String')
  let location
  try {
    location = new URL(url)
  } catch (error) {
    location = parse(url)
  }
  if (location.search) {
    location.query = parseSearch(location.search)
  }
  return location
}

export default parseURL
