import _ from 'mudash'
import { boot } from '../core'
import modules from './modules'
import { command } from './drivers/commands/actions'

export default function init() {
  const engine = boot(modules)
  return {
    command: _.compose(engine.dispatch, command)
  }
}
