import * as functions from 'firebase-functions'
import { loadProjectConfigSync } from 'moltres/config'
import * as coreModules from 'moltres/core/modules'
import { getPath } from 'moltres/lang'
import { pathResolve } from 'moltres/path'

const setupFunctionConfig = (modules) => {
  return loadProjectConfigSync({
    cwd: pathResolve(__dirname, '..', '..'),
    modules: {
      ...coreModules,
      ...modules
    },
    stage: getPath(['functions', 'stage'], functions.config()),
    target: 'function'
  })
}

export default setupFunctionConfig
