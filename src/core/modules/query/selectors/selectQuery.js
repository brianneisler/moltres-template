import { createPath, curry, getPath } from '../../../../utils/lang'

const selectQuery = curry((queryKey, state) =>
  getPath(['query', ...createPath(queryKey)], state)
)

export default selectQuery
