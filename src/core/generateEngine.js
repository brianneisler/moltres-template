import { weakMemoize } from '../utils/lang'

import { EngineState } from './constants'
import createEngine from './createEngine'
import setup from './setup'
import start from './start'

// NOTE BRN: We memoize this function so that when used to build the engine on
// backend invocations, we always get the same engine back after the first invocation
const generateEngine = weakMemoize(
  (
    modules,
    context,
    initialState = {},
    targetEngineState = EngineState.STARTED
  ) => {
    const engine = createEngine(modules, context, initialState)
    if (targetEngineState === EngineState.SETUP) {
      return setup(engine)
    }
    if (targetEngineState === EngineState.STARTED) {
      return start(setup(engine))
    }
    return engine
  }
)

export default generateEngine
