import { contains, forEachObjIndexed } from 'ramda'
import vorpal from 'vorpal'

const newCli = (context) => {
  const instance = vorpal()
  instance.isInteractive = contains('-i', process.argv)
  instance.disableAutoHelp = false
  instance.context = context

  const currentCommand = process.argv[2]
  forEachObjIndexed((plugin) => {
    const pluginConfig = plugin.config
    if (pluginConfig && pluginConfig.command) {
      const baseCommand = pluginConfig.command.replace(/\s\[.*\]/, '')
      if (baseCommand === currentCommand) {
        instance.disableAutoHelp = true
      }
    }
    instance.use(plugin.config)
  }, context.plugins)

  return instance
}

export default newCli
