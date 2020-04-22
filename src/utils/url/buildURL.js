import buildLocation from './buildLocation'
import formatURL from './formatURL'

const buildURL = (value) => formatURL(buildLocation(value))

export default buildURL
