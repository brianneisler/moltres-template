import { prop } from 'moltres-utils'
import startModule from './startModule'
import startProject from './startProject'

const START_EXECS = {
  module: startModule,
  project: startProject
}

const execNode = async (node, context) => {
  const exec = prop(node.type, START_EXECS)
  if (!exec) {
    throw new Error(`Start plugin could not find executor for node of type ${node.type}`)
  }
  return exec(node, context)
}

export default execNode
