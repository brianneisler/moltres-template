import { prop } from 'ramda'
import runModule from './runModule'
import runProject from './runProject'

const RUN_EXECS = {
  module: runModule,
  project: runProject
}

const execNode = async (node, context) => {
  const exec = prop(node.type, RUN_EXECS)
  if (!exec) {
    throw new Error(`Run plugin could not find executor for node of type ${node.type}`)
  }
  return exec(node, context)
}

export default execNode
