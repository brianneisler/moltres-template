import { prop } from 'ramda'
import testModule from './testModule'
import testProject from './testProject'

const TEST_EXECS = {
  module: testModule,
  project: testProject
}

const execNode = async (node, context) => {
  const exec = prop(node.type, TEST_EXECS)
  if (!exec) {
    throw new Error(`Test plugin could not find executor for node of type ${node.type}`)
  }
  return exec(node, context)
}

export default execNode
