import { curry, getPath } from '../../../utils/lang'

const selectScrollPathname = curry((pathname, state) =>
  getPath(['scroll', 'pathnames', pathname], state)
)

export default selectScrollPathname
