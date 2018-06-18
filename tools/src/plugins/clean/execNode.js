import { prop } from 'moltres-utils'
import cleanModule from './cleanModule'
import cleanProject from './cleanProject'

const CLEAN_EXECS = {
  module: cleanModule,
  project: cleanProject
}

const execNode = async (node, context) => {
  const exec = prop(node.type, CLEAN_EXECS)
  if (!exec) {
    throw new Error(`Clean plugin could not find executor for node of type ${node.type}`)
  }
  return exec(node, context)
}

export default execNode
