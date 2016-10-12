import invariant from 'invariant'
import { createDriverFactory } from './driver'
import { createPluginFactory } from './plugin'
import { createRegistry, createSchemaCache } from './registry'

export default class MoltresDefaultInjection {

  static injected = false

  static inject(engine) {
    invariant(
      !MoltresDefaultInjection.injected,
      'MoltresDefaultInjection: Cannot inject Moltres twice'
    )
    MoltresDefaultInjection.injected = true
    engine.injection.injectFactory('driver', createDriverFactory())
    engine.injection.injectFactory('plugin', createPluginFactory())
    engine.injection.injectRegistry(createRegistry())
    engine.injection.injectSchemaCache(createSchemaCache())
  }
}
