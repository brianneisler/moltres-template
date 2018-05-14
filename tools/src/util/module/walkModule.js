import { curry, forEach } from 'ramda'

const walkModule = curry((fn, mod) => {
  fn(mod)
  forEach(walkModule(fn), mod.dependsOn)
})

export default walkModule
