import { has, is, reduce, values } from 'moltres-utils'
import createAction from './createAction'
import createOption from './createOption'

const createCommand = (config) => {
  if (is(Function, config)) {
    return config
  }
  if (!has('command', config)) {
    throw new Error(`config is missing a command property ${config}`)
  }
  if (!has('action', config)) {
    throw new Error(`config is missing an action property ${config}`)
  }
  return (cli) => {
    let instance = cli.command(config.command)
    if (has('description', config)) {
      instance = instance.description(config.description)
    }
    if (has('options', config)) {
      instance = reduce(
        (inst, option) => createOption(option, inst),
        instance,
        values(config.options)
      )
    }
    return instance.action(createAction(config.action, config))
  }
}

export default createCommand
