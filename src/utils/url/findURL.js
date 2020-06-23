import { URL } from './constants/Regex'
import parseURL from './parseURL'

const findURL = (string) => {
  const result = string.match(URL)
  if (result) {
    return parseURL(result[0])
  }
  return null
}

export default findURL
