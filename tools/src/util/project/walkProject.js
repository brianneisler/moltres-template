import { walk } from 'moltres-utils'
import { assoc, curry, forEach, forEachObjIndexed, has, pick, values } from 'ramda'

const newWalkContext = (data) => pick([
  'visited'
], data)

const projectWalkee = (context) => {
  let updatedContext = context
  return (project, iteratee, recur) => {
    iteratee(project)
    updatedContext = newWalkContext({
      ...context,
      visited: assoc(project.name, true, context.visited)
    })
    forEachObjIndexed((childProject) => {
      if (!has(childProject.name, updatedContext.visited)) {
        recur(childProject, iteratee)
      }
    }, project.projects)
    forEach((childProject) => {
      if (!has(childProject.name, updatedContext.visited)) {
        recur(childProject, iteratee)
      }
    }, project.dependsOn)
  }
}

const walkProject = curry((iteratee, project) => {
  const context = newWalkContext({
    visited: {}
  })
  return walk(
    projectWalkee(context),
    iteratee,
    project
  )
})

export default walkProject
