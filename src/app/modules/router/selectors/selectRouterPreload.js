import { curry, getPath } from '../../../../utils/lang'

const selectRouterPreload = curry((pathname, state) =>
  getPath(['router', 'preloads', pathname], state)
)

export default selectRouterPreload
