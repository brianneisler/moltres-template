import { EngineState, StatusCode } from 'moltres/constants'
import { generateEngine } from 'moltres/core'

import setupFunctionContexts from '../setupFunctionContexts'

import { getRequestHandlerModuleName } from './util'

const setupEventsFunction = (modules, config) => {
  return (request, response) => {
    // NOTE BRN: The setupFunctionContexts function is memoized, so it should return the same
    // contexts on each invocation
    setupFunctionContexts(config, 'events')
      .then(({ context }) => {
        // NOTE BRN: The generateEngine function is memoized, so it should return the same
        // contexts on each invocation
        const engine = generateEngine(
          modules,
          context,
          undefined,
          EngineState.SETUP
        )
        const module = engine.getModule(getRequestHandlerModuleName(request))

        if (module.handleEventRequest) {
          return module.handleEventRequest(context, request, response)
        }
        const eventModule = engine.getModule('event')
        return eventModule.handleEventRequest(context, request, response)
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error)
        response.sendStatus(StatusCode.ERROR)
      })
  }
}

export default setupEventsFunction
