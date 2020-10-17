import { StatusCode } from '../../constants'
import { generateEngine } from '../../core'
import { EngineState } from '../../core/constants'
import setupFunctionContexts from '../setupFunctionContexts'

import * as appModules from './modules'

const setupAppFunction = (modules, config) => {
  modules = {
    ...modules,
    ...appModules
  }
  return (request, response) => {
    // NOTE BRN: The setupFunctionContexts function is memoized, so it should return the same
    // contexts on each invocation
    setupFunctionContexts(config, 'app')
      .then(({ context }) => {
        // NOTE BRN: The generateEngine function is memoized, so it should return the same
        // contexts on each invocation
        const engine = generateEngine(
          modules,
          context,
          undefined,
          EngineState.SETUP
        )
        const app = engine.getModule('middleware').getApp()
        app(request, response)
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error)
        response.sendStatus(StatusCode.ERROR)
      })
  }
}

export default setupAppFunction
