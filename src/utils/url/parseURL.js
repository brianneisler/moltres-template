import { URL, parse } from 'url'
import parseSearch from './parseSearch'

const parseURL = (url) => {
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
