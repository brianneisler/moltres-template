import createLogger from './createLogger'
import defaultOptionsTo from './defaultOptionsTo'

const createAction = (action, config, context) =>
  async function(args) {
    const instance = this

    // NOTE BRN: Hack, vorpal 1.x doesn't support default values for options, so we inject them here
    const defaultedArgs = defaultOptionsTo(args, config)

    return action(
      instance,
      defaultedArgs,
      context.merge({
        logger: createLogger(instance)
      })
    )
  }

export default createAction
