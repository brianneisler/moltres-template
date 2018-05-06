import { contains, forEachObjIndexed } from 'ramda'
import createCommand from './createCommand'

const processPlugins = (cli) => {
  forEachObjIndexed((plugin) => {
    const pluginConfig = plugin.config
    if (pluginConfig && pluginConfig.command) {
      const baseCommand = pluginConfig.command.replace(/\s\[.*\]/, '')
      if (baseCommand === cli.currentCommand) {
        cli.disableAutoHelp = true
      }
    }
    cli.use(createCommand(plugin.config, cli.context))
  }, cli.context.plugins)
  return cli
}

export default processPlugins
