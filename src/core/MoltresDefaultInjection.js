import invariant from 'invariant'
import { DriverFactory, DriverRegistry, SchemaCache } from './driver'
import { Engine } from './engine'


export default class MoltresDefaultInjection {

  static injected = false

  static inject() {
    invariant(
      !MoltresDefaultInjection.injected,
      'MoltresDefaultInjection: Cannot inject Moltres twice'
    )
    MoltresDefaultInjection.injected = true
    Engine.injection.injectDriverFactory(DriverFactory)
    Engine.injection.injectDriverRegistry(DriverRegistry)
    Engine.injection.injectSchemaCache(SchemaCache)
  }
}
