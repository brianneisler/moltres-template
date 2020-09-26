import * as functions from 'firebase-functions'

import { loadProjectConfigSync } from '../config'
import * as coreModules from '../core/modules'
import { getPath } from '../utils/lang'
import { pathResolve } from '../utils/path'

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
