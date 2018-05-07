import { filter, isNil, not, pipe } from 'ramda'

const compact = filter(pipe(isNil, not))

export default compact
