import { curry, getPath } from 'moltres/lang'

const selectScrollPathname = curry((pathname, state) =>
  getPath(['scroll', 'pathnames', pathname], state)
)

export default selectScrollPathname
