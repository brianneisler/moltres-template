import call from './call'
import getContext from './getContext'
import createFactory from './createFactory'

const withContext = (contextSelector) => (factory) =>
  createFactory(function*(props, ...rest) {
    const context = yield* getContext(contextSelector)
    return yield call(
      factory,
      {
        ...props,
        ...context
      },
      ...rest
    )
  })

export default withContext
