import { curry, getPath } from 'moltres/lang'

const selectRouterPreload = curry((pathname, state) =>
  getPath(['router', 'preloads', pathname], state)
)

export default selectRouterPreload
