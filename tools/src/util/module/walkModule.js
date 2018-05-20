import { walk } from 'moltres-utils'
import { assoc, curry, forEach, forEachObjIndexed, has, pick, values } from 'ramda'

const newWalkContext = (data) => pick([
  'visited'
], data)

const moduleWalkee = (context) => {
  let updatedContext = context
  return (mod, iteratee, recur) => {
    iteratee(mod)
    updatedContext = newWalkContext({
      ...context,
      visited: assoc(mod.name, true, context.visited)
    })
    forEach((childModule) => {
      if (!has(childModule.name, updatedContext.visited)) {
        recur(childModule, iteratee)
      }
    }, mod.dependsOn)
  }
}

const walkModule = curry((iteratee, mod) => {
  const context = newWalkContext({
    visited: {}
  })
  return walk(
    moduleWalkee(context),
    iteratee,
    mod
  )
})

export default walkModule
