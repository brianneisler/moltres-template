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
  // TODO BRN: Load SDK config
  const config = {}
  const context = setupSdkContext(config)
  // TODO BRN: Authenticate the sdk
  const engine = generateEngine(modules, context, undefined, EngineState.SETUP)

  const sdkModule = engine.getModule('sdk')
  return sdkModule.getSDK()
}

export default setupSdk
