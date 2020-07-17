import { createPath, curry, getPath } from '../../../../utils/lang'

const selectQueryCursorNext = curry((queryKey, state) =>
  getPath(['query', ...createPath(queryKey), 'cursorNext'], state)
)

export default selectQueryCursorNext
