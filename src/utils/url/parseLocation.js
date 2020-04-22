import formatURL from './formatURL'
import parseURL from './parseURL'

const parseLocation = (location) => ({
  ...location,
  ...parseURL(formatURL(location))
})

export default parseLocation
