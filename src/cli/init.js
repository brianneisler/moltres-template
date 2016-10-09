import _ from 'mudash'
import { boot } from '../core'
import * as blueprint from './blueprint'
import { command } from './drivers/commands/actions'

export default function init() {
  const engine = boot(blueprint)
  return {
    command: _.compose(engine.dispatch, command)
  }
}
