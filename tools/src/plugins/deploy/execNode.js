import { prop } from 'moltres-utils'
import deployModule from './deployModule'
import deployProject from './deployProject'

const DEPLOY_EXECS = {
  module: deployModule,
  project: deployProject
}

const execNode = async (node, context) => {
  const exec = prop(node.type, DEPLOY_EXECS)
  if (!exec) {
    throw new Error(`Deploy plugin could not find executor for node of type ${node.type}`)
  }
  return exec(node, context)
}

export default execNode
