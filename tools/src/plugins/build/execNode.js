import { prop } from 'moltres-utils'
import buildModule from './buildModule'
import buildProject from './buildProject'

const BUILD_EXECS = {
  module: buildModule,
  modulesDir: async () => {},
  project: buildProject
}

const execNode = async (node, context) => {
  const exec = prop(node.type, BUILD_EXECS)
  if (!exec) {
    throw new Error(`Build plugin could not find executor for node of type ${node.type}`)
  }
  return exec(node, context)
}

export default execNode
