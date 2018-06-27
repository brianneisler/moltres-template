import getContext from './getContext'
import createFactory from './createFactory'

const withContext = (contextSelector) => (factory) =>
  createFactory(function*(props, ...rest) {
    const context = yield getContext(contextSelector)
    return factory(
      {
        ...props,
        ...context
      },
      ...rest
    )
  })

export default withContext
