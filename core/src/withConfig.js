import call from './call'
import getConfig from './getConfig'
import createFactory from './createFactory'

const withConfig = (selector) => (factory) =>
  createFactory(function*(props, ...rest) {
    const config = yield* getConfig(selector)
    return yield call(
      factory,
      {
        ...props,
        ...config
      },
      ...rest
    )
  })

export default withConfig
