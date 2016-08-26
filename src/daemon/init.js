import { Engine, MoltresDefaultInjection } from '../core'
import * as drivers from './drivers'

const blueprint = {
  drivers
}

export default function init() {
  MoltresDefaultInjection.inject()
  Engine.updateBlueprint(blueprint)
}
