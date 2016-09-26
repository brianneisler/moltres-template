import invariant from 'invariant'
import { createDriverFactory } from './driver'
import { createRegistry, createSchemaCache } from './registry'


export default class MoltresDefaultInjection {

  static injected = false

  static inject(engine) {
    invariant(
      !MoltresDefaultInjection.injected,
      'MoltresDefaultInjection: Cannot inject Moltres twice'
    )
    MoltresDefaultInjection.injected = true
    engine.injection.injectFactory('drivers', createDriverFactory())
    engine.injection.injectRegistry(createRegistry())
    engine.injection.injectSchemaCache(createSchemaCache())
  }
}
