import { createPath, curry, getPath } from '../../../../utils/lang'

const selectQueryResults = curry((queryKey, state) =>
  getPath(['query', ...createPath(queryKey), 'results'], state)
)

export default selectQueryResults
