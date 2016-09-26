import MoltresDefaultInjection from './MoltresDefaultInjection'
import { createEngine } from './engine'

export default function boot(blueprint, injection = MoltresDefaultInjection) {
  const engine = createEngine()
  injection.inject(engine)
  if (blueprint) {
    engine.updateBlueprint(blueprint)
  }
  return engine
}
