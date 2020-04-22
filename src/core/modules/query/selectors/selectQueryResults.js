import { createPath, curry, getPath } from '../../../../utils/data'

const selectQueryResults = curry((queryKey, state) =>
  getPath(['query', ...createPath(queryKey), 'results'], state)
)

export default selectQueryResults
