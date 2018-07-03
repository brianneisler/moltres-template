import getContext from './getContext'
import setContext from './setContext'

const updateContext = function*(updates) {
  const context = yield* getContext()
  return yield setContext({
    ...context,
    ...updates
  })
}

export default updateContext
