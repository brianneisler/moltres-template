import { isNil, reject } from 'ramda'

const compact = reject(isNil)

export default compact
