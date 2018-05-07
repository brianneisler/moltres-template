import createLogger from './createLogger'

const createAction = (action, context) =>
  async function(args) {
    const instance = this
    return action(instance, args, context.merge({
      logger: createLogger(instance)
    }))
  }

export default createAction
