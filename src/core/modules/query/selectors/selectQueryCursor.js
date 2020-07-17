import { createPath, curry, getPath } from '../../../../utils/lang'

const selectQueryCursor = curry((queryKey, state) =>
  getPath(['query', ...createPath(queryKey), 'cursor'], state)
)

export default selectQueryCursor
