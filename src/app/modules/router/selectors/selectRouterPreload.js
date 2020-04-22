import { curry, getPath } from '../../../../utils/data'

const selectRouterPreload = curry((pathname, state) =>
  getPath(['router', 'preloads', pathname], state)
)

export default selectRouterPreload
