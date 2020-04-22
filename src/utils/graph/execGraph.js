import { all, props } from 'bluebird'
import { assocProp, curry, getProp, map } from '../data'
import getOutNodes from './getOutNodes'
import traversePostorder from './traversePostorder'

const execGraph = curry(async (fn, graph) => {
  let promises = {}
  const execNode = async (nodeGraph, node, nodeFn) => {
    const foundPromises = map((outNode) => getProp(outNode, promises), getOutNodes(nodeGraph, node))
    await all(foundPromises)
    return nodeFn(nodeGraph.node(node), node)
  }

  traversePostorder((value, node) => {
    const promise = execNode(graph, node, fn)
    promises = assocProp(node, promise, promises)
  }, graph)

  return props(promises)
})

export default execGraph
