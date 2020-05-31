import { curry, getPath } from '../../../utils/data'

const selectScrollPathname = curry((pathname, state) =>
  getPath(['scroll', 'pathnames', pathname], state)
)

export default selectScrollPathname
