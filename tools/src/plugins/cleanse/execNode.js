import { prop } from 'moltres-utils'
import cleanseModule from './cleanseModule'
import cleanseModulesDir from './cleanseModulesDir'
import cleanseProject from './cleanseProject'

const CLEANSE_EXECS = {
  module: cleanseModule,
  modulesDir: cleanseModulesDir,
  project: cleanseProject
}

const execNode = async (node, context) => {
  const exec = prop(node.type, CLEANSE_EXECS)
  if (!exec) {
    throw new Error(`Cleanse plugin could not find executor for node of type ${node.type}`)
  }
  return exec(node, context)
}

export default execNode
