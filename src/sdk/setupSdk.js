import { generateEngine } from '../core'
import { EngineState } from '../core/constants'
import * as topModules from '../modules'

import * as sdkModules from './modules'
import setupSdkContext from './setupSdkContext'

const setupSdk = () => {
  const modules = {
    ...topModules,
    ...sdkModules
  }
  const context = setupSdkContext(modules)
  const engine = generateEngine(modules, context, undefined, EngineState.SETUP)

  const cli = engine.getModule('cli')
  const program = cli.getProgram()
}

export default setupSdk
