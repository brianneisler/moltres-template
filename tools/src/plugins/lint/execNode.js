import { prop } from 'ramda'
import lintModule from './lintModule'
import lintProject from './lintProject'

const LINT_EXECS = {
  module: lintModule,
  project: lintProject
}

const execNode = async (node, context) => {
  const exec = prop(node.type, LINT_EXECS)
  if (!exec) {
    throw new Error(`Lint plugin could not find executor for node of type ${node.type}`)
  }
  return exec(node, context)
}

export default execNode
