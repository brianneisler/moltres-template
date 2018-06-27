import { forEachObjIndexed } from 'moltres-utils'
import createCommand from './createCommand'

const processPlugins = (cli, plugins) => {
  forEachObjIndexed((plugin) => {
    if (!plugin.command) {
      throw new Error(`A plugin must declare a command. This plugin doesn't have one ${plugin}`)
    }
    const baseCommand = plugin.command.replace(/\s\[.*\]/, '')
    if (baseCommand === cli.currentCommand) {
      cli.disableAutoHelp = true
    }
    cli.use(
      createCommand({
        ...plugin,
        action: plugin.plugin.action
      })
    )
  }, plugins)
  return cli
}

export default processPlugins
