import { loadConfig } from '../utils/config'
import { assocPath, invariant, isString } from '../utils/lang'
import { pathResolve } from '../utils/path'

const loadProjectConfig = async (options, initialState = {}, context = {}) => {
  const { target } = options
  invariant(isString(target), 'target must be a defined String')
  return await loadConfig(
    options,
    initialState,
    assocPath(['project', 'dir'], pathResolve(__dirname, '..', '..'), context)
  )
}

export default loadProjectConfig
