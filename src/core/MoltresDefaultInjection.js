import invariant from 'invariant'
import { DriverFactory, DriverRegistry, SchemaCache } from './driver'


export default class MoltresDefaultInjection {

  static injected = false

  static inject(engine) {
    invariant(
      !MoltresDefaultInjection.injected,
      'MoltresDefaultInjection: Cannot inject Moltres twice'
    )
    MoltresDefaultInjection.injected = true
    engine.injection.injectDriverFactory(DriverFactory)
    engine.injection.injectDriverRegistry(DriverRegistry)
    engine.injection.injectSchemaCache(SchemaCache)
  }
}
