import { equals, reject } from 'moltres-utils'
import createDelimeter from './createDelimeter'
import newCli from './newCli'
import parseCommand from './parseCommand'
import printCoreVersion from './printCoreVersion'
import printWelcome from './printWelcome'

const createCli = (plugins) => {
  const cli = newCli(plugins)

  const start = async (context) => {
    cli.context = context
    if (cli.isCoreVersionCommand) {
      printCoreVersion(context.logger)
      if (!cli.isInteractive) {
        return null
      }
    }
    if (cli.isInteractive) {
      await printWelcome(context.logger)
      process.argv = reject(equals('-i'), process.argv)
      return cli
        .delimiter(createDelimeter(context))
        .show()
        .parse(process.argv)
    }

    if (!cli.disableAutoHelp && process.argv.length <= 3) {
      process.argv = [...process.argv, ['--help']]
    }

    return parseCommand(cli, process.argv)
  }

  cli.start = start
  return cli
}

export default createCli
