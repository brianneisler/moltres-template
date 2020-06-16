import { createPath, curry, getPath } from '../../../../utils/data'

const selectQuery = curry((queryKey, state) =>
  getPath(['query', ...createPath(queryKey)], state)
)

export default selectQuery
