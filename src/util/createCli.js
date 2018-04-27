import path from 'path'
import { contains, equals, reject } from 'ramda'
import createDelimeter from './createDelimeter'
import newCli from './newCli'
import parseCommand from './parseCommand'
import printWelcome from './printWelcome'

const createCli = (context) => {
  const cli = newCli(context)

  const start = async () => {
    if (cli.isInteractive) {
      await printWelcome(cli)
      process.argv = reject(equals('-i'), process.argv)
      return cli
        .delimiter(createDelimeter(context))
        .show()
        .parse(process.argv)
    }

    if (!cli.disableAutoHelp && process.argv.length <= 3) {
      process.argv = [ ...process.argv, [ '--help' ]]
    }

    return parseCommand(cli, process.argv)
  }

  cli.start = start
  return cli
}

export default createCli
