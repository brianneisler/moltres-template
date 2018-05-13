import { contains, forEachObjIndexed } from 'ramda'
import createCommand from './createCommand'

const processPlugins = (cli) => {
  forEachObjIndexed((plugin) => {
    if (!plugin.command) {
      throw new Errpr(`A plugin must declare a command. This plugin doesn't have one ${plugin}`)
    }
    const baseCommand = plugin.command.replace(/\s\[.*\]/, '')
    if (baseCommand === cli.currentCommand) {
      cli.disableAutoHelp = true
    }
    cli.use(createCommand({
      ...plugin,
      action: plugin.plugin.action
    }, cli.context))
  }, cli.context.plugins)
  return cli
}

export default processPlugins
