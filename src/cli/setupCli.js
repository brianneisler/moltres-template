import { generateEngine } from '../core'
import { EngineState } from '../core/constants'
import * as functionsModules from '../functions/modules'

import * as cliModules from './modules'
import setupCliContexts from './setupCliContexts'
import tearDownCliContexts from './tearDownCliContexts'

const setupCli = async () => {
  const modules = {
    ...functionsModules,
    ...cliModules
  }
  const contexts = await setupCliContexts(modules)
  const { context } = contexts
  const { logger } = context

  const engine = generateEngine(modules, context, undefined, EngineState.SETUP)

  const cli = engine.getModule('cli')
  const program = cli.getProgram()
  const exec = async (argv) => {
    try {
      await program.parseAsync(argv)
      if (!program.args.length) {
        return program.help()
      }
      // TODO BRN: Find the command that was selected and execute it
    } catch (error) {
      logger.warn('An error occured executing the command')
      throw error
    } finally {
      await tearDownCliContexts(contexts)
    }
  }

  return {
    context,
    exec,
    program
  }
}

export default setupCli
