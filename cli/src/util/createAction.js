import createLogger from './createLogger'
import defaultOptionsTo from './defaultOptionsTo'

const createAction = (action, config) =>
  async function(args) {
    const instance = this
    // NOTE BRN: Hack, vorpal 1.x doesn't support default values for options, so we inject them here
    const defaultedArgs = defaultOptionsTo(args, config)
    const logger = createLogger(instance)

    try {
      return await action(
        instance,
        defaultedArgs,

        // NOTE BRN: Bit of a HACK here. context is pulled from the cli instance which is set
        // in createCli in the start method
        instance.parent.context.merge({
          logger
        })
      )
    } catch(error) {
      if (error.type === 'exception') {
        logger.warn(error.message)
      } else {
        throw error
      }
    }
  }

export default createAction
