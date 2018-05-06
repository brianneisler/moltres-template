import { has, is, reduce } from 'ramda'
import createAction from './createAction'

const createCommand = (config, context) => {
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
        (inst, option) => inst.option(...option),
        instance,
        config.options
      )
    }
    return instance.action(createAction(config.action, context))
  }
}

export default createCommand
