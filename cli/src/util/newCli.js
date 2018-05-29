import { contains } from 'ramda'
import vorpal from 'vorpal'
import processPlugins from './processPlugins'

const newCli = (plugins) => {
  const cli = vorpal()
  cli.isInteractive = contains('-i', process.argv)
  cli.isCoreVersionCommand = contains('-v', process.argv)
    || contains('--version', process.argv)
  cli.disableAutoHelp = false
  cli.currentCommand = process.argv[2]
  return processPlugins(cli, plugins)
}

export default newCli
