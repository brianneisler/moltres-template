import { prop } from 'moltres-utils'
import setupModule from './setupModule'
import setupModulesDir from './setupModulesDir'
import setupProject from './setupProject'

const SETUP_EXECS = {
  module: setupModule,
  modulesDir: setupModulesDir,
  project: setupProject
}

const execNode = async (node, context) => {
  const exec = prop(node.type, SETUP_EXECS)
  if (!exec) {
    throw new Error(`Setup plugin could not find executor for node of type ${node.type}`)
  }
  return exec(node, context)
}

export default execNode
