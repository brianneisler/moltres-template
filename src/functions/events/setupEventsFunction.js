import { StatusCode } from '../../constants'
import { generateEngine } from '../../core'
import { EngineState } from '../../core/constants'
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
        return response.sendStatus(StatusCode.BAD_REQUEST)
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error)
        response.sendStatus(StatusCode.ERROR)
      })
  }
}

export default setupEventsFunction
