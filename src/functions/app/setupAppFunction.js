import { generateEngine } from '../../core'
import { EngineState } from '../../core/constants'
import * as functionModules from '../modules'
import setupFunctionContexts from '../setupFunctionContexts'

import * as appModules from './modules'

const setupAppFunction = (config) => {
  const modules = {
    ...appModules,
    ...functionModules
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
          config,
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
        response.sendStatus(500)
      })
  }
}

export default setupAppFunction
