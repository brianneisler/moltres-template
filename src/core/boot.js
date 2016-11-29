import MoltresDefaultInjection from './MoltresDefaultInjection'
import { createEngine } from './engine'

export default function boot(modules, injection = MoltresDefaultInjection) {
  const engine = createEngine()
  injection.inject(engine)
  if (modules) {
    engine.registerModules(modules)
  }
  engine.boot()
  return engine
}
