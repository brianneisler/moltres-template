import { EngineState, StatusCode } from 'moltres/constants'
import { generateEngine } from 'moltres/core'

import setupFunctionContexts from '../setupFunctionContexts'

import * as graphqlModules from './modules'

const setupGraphQLFunction = (modules, config) => {
  modules = {
    ...modules,
    ...graphqlModules
  }
  return (request, response) => {
    // NOTE BRN: The setupFunctionContexts function is memoized, so it should return the same
    // contexts on each invocation
    setupFunctionContexts(config, 'graphql')
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

export default setupGraphQLFunction
