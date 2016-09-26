import _ from 'mudash'
import { boot } from '../core'
import * as drivers from './drivers'
import * as m from '../core/m'
import { command } from './drivers/commands/actions'

const blueprint = _.merge(m, {
  drivers
})

export default function init() {
  const engine = boot(blueprint)
  return {
    command: _.compose(engine.dispatch, command)
  }
}
