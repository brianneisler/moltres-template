import * as functions from 'firebase-functions'

import { assoc, isFunction, keys, reduce } from '../../utils/lang'
import { camelCase } from '../../utils/string'
import setupFunctionContexts from '../setupFunctionContexts'

const setupScheduleFunctions = (modules, config, runtimeOptions) =>
  reduce(
    (accum, moduleName) => {
      // eslint-disable-next-line import/namespace
      const mod = modules[moduleName]
      if (isFunction(mod.setupSchedule)) {
        const scheduledFuncs = mod.setupSchedule(config)
        return reduce(
          (funcs, schedule) => {
            const func = scheduledFuncs[schedule]
            const funcName = `schedule_${moduleName}_${camelCase(schedule)}`
            return assoc(
              funcName,
              functions
                .runWith(runtimeOptions)
                .pubsub.schedule(schedule)
                // TODO BRN: Wrap this in a middleware that boots up the context
                // and passes it to the function
                .onRun(async () => {
                  const { adminContext, context } = await setupFunctionContexts(
                    config,
                    funcName
                  )
                  return func(context, adminContext)
                }),
              funcs
            )
          },
          accum,
          keys(scheduledFuncs)
        )
      }
      return accum
    },
    {},
    keys(modules)
  )

export default setupScheduleFunctions
