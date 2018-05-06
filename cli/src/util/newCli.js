import { contains } from 'ramda'
import vorpal from 'vorpal'
import processPlugins from './processPlugins'

const newCli = (context) => {
  const cli = vorpal()
  cli.isInteractive = contains('-i', process.argv)
  cli.disableAutoHelp = false
  cli.context = context
  cli.currentCommand = process.argv[2]
  return processPlugins(cli)
}

export default newCli
