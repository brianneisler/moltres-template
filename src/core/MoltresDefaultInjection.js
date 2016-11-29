import invariant from 'invariant'
import { createRegistry } from './registry'

export default class MoltresDefaultInjection {

  static injected = false

  static inject(engine) {
    invariant(
      !MoltresDefaultInjection.injected,
      'MoltresDefaultInjection: Cannot inject Moltres twice'
    )
    MoltresDefaultInjection.injected = true
    engine.injection.injectModuleRegistry(createRegistry())
  }
}
