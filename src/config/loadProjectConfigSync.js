import { loadConfigSync } from '../utils/config'
import { invariant, isString } from '../utils/lang'
import { pathResolve } from '../utils/path'

const loadProjectConfigSync = ({ modules, stage, target }) => {
  invariant(isString(target), 'target must be a defined String')
  return loadConfigSync(
    { modules, stage, target },
    {},
    {
      project: {
        dir: pathResolve(__dirname, '..', '..')
      }
    }
  )
}

export default loadProjectConfigSync
