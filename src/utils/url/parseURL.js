import { URL, parse } from 'url'
import { invariant } from '../lang'
import { isString } from '../data'
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
