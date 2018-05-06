import { filter, isNil } from 'ramda'

const compact = filter(isNil)

export default compact
